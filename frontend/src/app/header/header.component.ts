import { Component, OnDestroy, OnInit } from '@angular/core';
import { SellerService } from '../@core/seller.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../@core/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  collapse!:any;
  menuFlag:boolean = true;


   sellerName:string|null = "";
   userName:string|null = "";
   userLoginFlag!:boolean;
   sellerLoginFlag:boolean = false;

   cartItems:any = "";
   storeProduct:any = [];
   getLocalproduct:any = [];
   getLocalItem:any = [];
   
   constructor(private dataSorce:SellerService, private productService:ProductService, private router:Router, private route:ActivatedRoute){}
   
   ngOnInit(): void {
       window.addEventListener('click', (e)=>{
          let collapseNav = document.querySelector("#collapsibleNavbar");
           if(collapseNav?.classList[2] === 'show'){
            collapseNav.classList.remove("show")
           }
        })

      this.productService.userLogOut.subscribe(resp=>{
        if(resp == false){
          this.userLoginFlag = false;
        }
      })
      if(localStorage.getItem('userName')){
        this.userLoginFlag = true;
        this.userName = localStorage.getItem('userName');
      }
      this.productService.isUserLoggedIn.subscribe(res=>{
      if( res || res !== null || localStorage.getItem('userName')){
        this.userLoginFlag = true;
        this.userName = res;
      } else if(res== ""){
        this.userLoginFlag = false;
      }
     });    
  
    // Check the Seller is Logged In
    this.dataSorce.sellerLogOut.subscribe(res=>{
        if(res == false){
          this.sellerLoginFlag = false;
        }
    });
    if(localStorage.getItem('sellerToken')){
      this.sellerLoginFlag = true;
      this.sellerName = localStorage.getItem('name');
    }
    this.dataSorce.isSellerLoggedIn.subscribe((res)=>{
      if(res || localStorage.getItem('sellerToken')){
        this.sellerLoginFlag = true;
        this.sellerName = localStorage.getItem('name');
      }
    });
  
    // Get Cart Products Here
    let addedCartProduct = localStorage.getItem("products") !=='undefined' ? JSON.parse(localStorage.getItem('products')!):null;
    addedCartProduct = addedCartProduct ? addedCartProduct : [];
    this.cartItems = addedCartProduct.length;
    
    // Subscribe Current Added Cart Product
    this.productService.cartItem.subscribe((res)=>{
      this.cartItems = res ? res : "";
    });
   this.getCartItems();

  } // END ngOnInit() 

   // Get Add to Cart Item
   getCartItems(){
    if(localStorage.getItem('userToken')){
      this.productService.cartItem.subscribe((res:any)=>{
        this.cartItems = res ? res : "";
     });
    } else {
      //let cartLength = JSON.parse(localStorage.getItem('products') || "");
       this.productService.cartItem.subscribe((res)=>{
        this.cartItems  = res;
      })
    }
   } 

   // Product Search Method
   searchProducts(data:any){
     if(data && data !==null && data !== undefined){
      this.productService.genericProductSearch(data).subscribe((result:any)=>{
        if(result.length !==0 && result !== null){
          this.productService.searchData.next(result.search_result);
          this.router.navigate(['/shop/products']);   
          } 
          if(result.message == 'Product not found!'){
          alert("Product not found");
        } 
      } 
     );
     }
     if(data == null || data == undefined || data == ''){
      alert("Please enter product name");
     }
   }

   // LogOut Method
   logOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
   }

  //  toggle(e){
  //    e.preventDefault();
  //    this.collapse = document.getElementsByClassName("collapse");
  //    if(this.menuFlag === true){
  //     this.collapse[0].style.display="block";
  //     this.menuFlag = false;
  //    } else if(this.menuFlag === false){
  //     this.windowOnClick();
  //     this.collapse[0].style.display="none";
  //     this.menuFlag = true;
  //    }
    
  //  }

  //  windowOnClick(){
  //   let navbarToggler:any = document.querySelector(".navbar-toggler");
  //   let collapse:any = document.querySelector(".collapse");
  //   window.addEventListener('toggle', (e)=>{
  //    alert("its working")
  //   })
  //  }








} // END CLASS HERE
