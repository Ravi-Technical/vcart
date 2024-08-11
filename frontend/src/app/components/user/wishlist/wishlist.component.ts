import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  wishlist_products:any = [];

  userId:any;
  
  constructor(private dataSource:ProductService){}

  ngOnInit(): void {
     this.userId = localStorage.getItem('tempData') !== undefined ? JSON.parse(localStorage.getItem('tempData')!)._id:null;
     this.original_wishlist_product();
  }
  
  // Get Wishlist Products
  original_wishlist_product(){
     this.dataSource.single_User_Wishlist_product(this.userId).subscribe((res)=>{
        if(res && res !==null && res !==undefined){
          this.wishlist_products = res;
        } 
     })
  }

  // Remove Products from Wishlist
  removeProduct(productId:string){
    let alertSuccess:any = document.getElementById('alertSuccess');
    alertSuccess.style.display="block";
    setTimeout(()=>{
    alertSuccess.style.display="none";
    },2000)
     this.dataSource.genericDeleteWishlist(productId).subscribe(res=>{
      this.original_wishlist_product();
     })
  }

   


}
