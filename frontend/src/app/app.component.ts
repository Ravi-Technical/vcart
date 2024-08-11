import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'testCommerce';

  // addRow = new addRowInterface();

  // dataArray:any = [];

  constructor(){};

  ngOnInit():void{
    //  this.dataArray.push(this.addRow);
  }
  // addNewRow(){
  //   this.addRow = new addRowInterface();
  //   this.dataArray.push(this.addRow);
  // }
  // submitForm(){
  //   this.dataArray.forEach((item:any)=>{
  //     console.log(item);
  //   })
  // }
  // removeRow(index:any){
  //  this.dataArray.splice(index);
  // }


}
