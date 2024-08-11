import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId!:any;
  orderdProduct:any = [];
  pQty:any = [];
  date = new Date();
  deliveryDate:any;
  getMonth;
  getFullYear;
  

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit(): void {
    this.deliveryDate = this.date.getDate();
    this.getMonth = this.date.toLocaleString('default', { month: 'short' }); 
    this.getFullYear = this.date.getFullYear();
     this.userId = localStorage.getItem('tempData') !=='undefined' ? JSON.parse(localStorage.getItem('tempData')!)?.id:null;
     this.getOrderList(this.userId);
  }

  // Order List
  getOrderList(userId:string){
    this.productService.genericOrdredList(userId).subscribe((res:any)=>{
      if(res && res !==null && res !==undefined) {
        res.ordered_product.forEach((ele)=>{
          this.orderdProduct = this.orderdProduct.concat(ele.product);
          this.pQty = this.pQty.concat(ele.quantity);
        });
        for(let i=0; i<this.orderdProduct.length; i++){
            for(let j=0; j<this.pQty.length; j++){
             this.orderdProduct[i].quantity = this.pQty[i];
            }
        }
      } else {
        throw new Error();
      }
    });

  }

}
