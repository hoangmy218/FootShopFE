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
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [330, 600, 260, 700,218], label: 'Account ' }
  ];
  chart_Data = [{
    data: [], label: 'Doanh thu 2020'
  }];
  pieData = [{ data: [330, 600, 260, 700], label: 'Account A' }];
  chartLabels = ['January', 'February', 'Mars', 'April', 'sdj'];
  chart_Labels = [];
  data = [];
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
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue'},
    { backgroundColor: 'yellow'}
  ];


  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshLowStockList();
    })
  }

  totalCustomers: number =0;
  totalOrders : number =0;
  revenue: number =0;

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['ten', 'mausac','kichco'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshOverview();
    this.refreshLowStockList();
    this.refreshRevenueGraph();
  }

  refreshLowStockList() {
    this.service.getLowStock().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  refreshOverview(){
    this.service.getTotalCustomers().subscribe(res=>{
      console.log(res['total'])
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
        
        this.chart_Labels.push("Tháng " +element._id.monthBillDate)
        this.chart_Data[0]['data'].push(element.total)
      })
      console.log(this.chartPieMonths)
      console.log(this.chartPieData)
      console.log(this.pieData)
      console.log(this.chartLabels)
      console.log(this.chartData)
    })
  }
  
  onChartClick(event){
    
  }

}
