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
import { NgForm } from '@angular/forms';

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

  chart_Labels = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04','Tháng 05', 'Tháng 06', 'Tháng 07','Tháng 08' ,'Tháng 09','Tháng 10','Tháng 11','Tháng 12'];
  chartPieMonths = [];
  chartPieData = [{
    data: [], 
    label: "Revenue",
  },
  ];
  chartLabels = [];
  chart_Data = [{
    data: [], label: 'Biểu đồ biến động giá'
  }];
  public productList: { [id: string]: any; } = {};  
  // chart_Labels = [];
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


  constructor(
    public service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar

  ) {}

  totalCustomers: number =0;
  totalOrders : number =0;
  revenue: number =0;
  sanpham_ma: string = '';





  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.resetForm();
    this.refreshProductList();
    this.refreshOverview();

    // this.refreshRevenueGraph(this.sanpham_ma);
    this.refreshStockGraph();
    this.refreshSaleGraph();
  }
  
  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formProduct={
      _id : '',
      ten : '',
      mota: '',
      danhmuc_id: '',
      thuonghieu_id: '',
      dongia: 1000,
    }
  }
  onChange(value){
    console.log('value', value)
    this.refreshRevenueGraph(value);
    
  }

  refreshProductList(){
    this.service.getProductList().subscribe(data =>{
      console.log('List product', data);
      this.sanpham_ma = "5f729d9c3f60061244969a9a";
      this.service.formProduct._id = this.sanpham_ma;
      this.refreshRevenueGraph("5f729d9c3f60061244969a9a");

      
      data['data'].forEach(element => {
        
        // console.log(element["product_name"]);
        this.productList[element._id] = element.ten;
        // this.listItems.push(element)
      });
      console.log('productList',this.productList);
    });
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

  // refreshRevenueGraph(){
  //   this.service.getRevenueChart().subscribe(res=>{
  //     console.log(res)
  //     res.forEach(element=>{
  //       console.log(element)
  //       this.chartPieMonths.push("Tháng " +element._id.monthBillDate)

  //       this.chartPieData[0].data.push(element.total)
  //     })
  //     // console.log(this.chartPieMonths)
  //     // console.log(this.chartPieData)
  //     // console.log(this.pieData)
  //     // console.log(this.chartLabels)
  //     // console.log(this.chartData)
  //   })
  // }

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

  refreshRevenueGraph(id: string){
    this.chartLabels = [];
    this.chart_Data = [{
      data: [], label: 'Biểu đồ biến động giá'
    }];
    this.service.getProductPriceChart(id).subscribe(res=>{
      console.log(res)
      res.forEach(element=>{
        console.log(element)
        
        this.chartLabels.push("Tháng " +element._id.monthBillDate)
        this.chart_Data[0]['data'].push(element.total)
      })
   
    })
  }
  
  onChartClick(event){
    
  }

  onSubmit(form :NgForm){
    console.log(form.value);
  }

}
