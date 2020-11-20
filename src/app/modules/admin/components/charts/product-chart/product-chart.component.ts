import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartsModule, Color } from 'ng2-charts';
import { AdminService } from 'src/app/services/admin.service';
import {draw, generate} from 'patternomaly';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.scss']
})
export class ProductChartComponent implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [], label: 'Số sản phẩm nhập vào' },
    { data: [], label: 'Số sản phẩm bán ra' } //trang thai: Da duyet 2 - 4 hoan tat
  ];
  pieData = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels = ['January', 'February', 'Mars', 'April', 'sdj'];
  chart_Labels = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04','Tháng 05', 'Tháng 06', 'Tháng 07','Tháng 08' ,'Tháng 09','Tháng 10','Tháng 11','Tháng 12'];
  chartPieMonths = [];
  chartPieData = [{
    data: [], 
    label: "Revenue",
  },
  ];
  myColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, .1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    // ...colors for additional data sets
  ];
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgba(255, 0, 0, 0.8)' },
    { backgroundColor: 'rgba(0,255,0,0.8)' },
    { backgroundColor: 'rgba(0,0,255,0.8)'},
    { backgroundColor: 'yellow'}
  ];


  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshLowStockList();
        this.refreshOutOfStockList();
    })
  }

  totalCustomers: number =0;
  totalOrders : number =0;
  revenue: number =0;

  listData : MatTableDataSource<any>;
  listDataOTS : MatTableDataSource<any>;
  displayedColumns : string[] = ['ten', 'mausac','kichco'];
  displayedColumnsOTS : string[] = ['ten', 'mausac','kichco'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshOverview();
    this.refreshLowStockList();
    this.refreshOutOfStockList();
    this.refreshRevenueGraph();
    this.refreshStockGraph();
    this.refreshSaleGraph();
  }

  refreshLowStockList() {
    this.service.getLowStock().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  refreshOutOfStockList() {
    this.service.getOutOfStock().subscribe(res => {
      this.listDataOTS = new MatTableDataSource(res['data']);
      this.listDataOTS.sort = this.sort;
      this.listDataOTS.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }
  applyFilterOTS(filtervalue: string){
    this.listDataOTS.filter = filtervalue.trim().toLocaleLowerCase();
  }

  refreshOverview(){
    this.service.getTotalCustomers().subscribe(res=>{
      // console.log(res['total'])
      this.totalCustomers = res['total'];
    })
    this.service.getTotalOrders().subscribe(res=>{
      this.totalOrders = res['total'];
    })
    this.service.getRevenue().subscribe(res=>{
      this.revenue = res['total'];
    })
  }

  refreshRevenueGraph(){
    this.service.getRevenueChart().subscribe(res=>{
      console.log(res)
      res.forEach(element=>{
        console.log(element)
        this.chartPieMonths.push("Tháng " +element._id.monthBillDate)

        this.chartPieData[0].data.push(element.total)
      })
      // console.log(this.chartPieMonths)
      // console.log(this.chartPieData)
      // console.log(this.pieData)
      // console.log(this.chartLabels)
      // console.log(this.chartData)
    })
  }

  refreshStockGraph(){
    this.service.getStockChart().subscribe(res=>{
      for (var key =0; key < res['data'].length; key++){
      // res['data'].forEach((element, key)=>{
        if (key == 0){
          for(let i =0; i<res['data'][key]._id.monthBillDate-1; i++){
            this.chartData[0].data.push(0);
          }
          this.chartData[0].data.push(res['data'][key].sum);
        }else{
     
        this.chartData[0].data.push(res['data'][key].sum);
        console.log(this.chartData[0])
        }
       
      // });
      }
      
    })
  }

  refreshSaleGraph(){
    this.service.getOrderChart().subscribe(res=>{
      for (var key =0; key < res['data'].length; key++){
      // res['data'].forEach((element, key)=>{
          if (key == 0){
            console.log(key, this.chartData[1])
            for(let i =0; i<res['data'][key]._id.monthBillDate-1; i++){
              this.chartData[1].data.push(0);
            }
            this.chartData[1].data.push(res['data'][key].sum)
          }else{
            this.chartData[1].data.push(res['data'][key].sum)
            console.log(this.chartData[1])
          }  
      // });
        }
      
    })
  }
  
  onChartClick(event){
    
  }

}
