import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  sellerName = "";
  chartData:any = [];
  secondChart:any = [];
  // view:any= [350, 300];
  // view1:any= [400, 400];
  // // options
  // showXAxis: boolean = true;
  // showYAxis: boolean = true;
  // gradient: boolean = false;
  // showLegend: boolean = true;
  // showXAxisLabel: boolean = true;
  // yAxisLabel: string = 'Country';
  // showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Population';

  // colorScheme:any = {
  //   domain:['#1496bb', '#fbb03b', '#1f6377']
  // };

  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   },
  //     {
  //     "name": "UK",
  //     "value": 6200000
  //   }
  // ];

   // options
  //  gradient1: boolean = true;
  //  showLabels: boolean = true;
  //  isDoughnut: boolean = true;
 

  constructor(private dataSource:SellerService){}

  ngOnInit(): void {
    this.dataSource.charts().subscribe((res:any)=>{
      this.chartData = res ? res : [""];
      this.secondChart = res ? res : [""];
    });

  }

}
