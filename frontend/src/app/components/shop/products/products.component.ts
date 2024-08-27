import { Component, ElementRef, ViewChild } from '@angular/core';
import { SellerService } from 'src/app/@core/seller.service';
// import { Options } from '@angular-slider/ngx-slider';
import { ProductService } from 'src/app/@core/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  searchText;

  p: number = 1;

  pageSize!:3;count = 0;

  popular;lowHigh;hightLw;trend;
  
  default = "active";

  featuredProducts: any = [];

  wishlistId!: any;

  alertSuccess!: any;

  message: any = "";

  value: number = 500;

  flag:boolean = false;

  arrowIcon:boolean = false;brandIcon:boolean = false; sizeFlag:boolean = false;

  // options: Options = {
  //   floor: 0,
  //   ceil: 1000
  // };

  searchProducts:any = [];

  searchFlag:boolean = false;

  wholeProducts:any = [];

  tempAllProduct:any = [];
  
  categoriesList:any = [];

  holdCategoryName:any = [];

  cloneProduct: any[] = [];

  productList:any[] = [];

  filteredProduct: any;

  allBrands:any = [];

  allSize:any = ["S", "M", "L", "XL", "XXL"];
 
  searchKey!:any;

  resultData:any = [];

  priceValue!:number;

  priceFiltredProduct:any[] = [];

  isLoading!:boolean;

  constructor(private sellerService:SellerService, private productService:ProductService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
  this.alertSuccess = document.getElementById('alertSuccess');
  this.message = document.getElementById('message');
  this.productSearch();
  this.getAllproducts();
  this.getAllCategory();
  this.getAllBrands();
  // Default wishlisted product
  this.productService.wishlisted_Products().subscribe((res: any) => {
    let wishClass: any = document.getElementsByClassName('wishlist');
   if(res && this.wholeProducts !==null && res !==null && res !=='undefined'){
    for (let p of this.wholeProducts) {
      for (let result of res) {
        if (p?.id === result?.id) {
          wishClass[p.id].style.backgroundColor = '#6c58ef';
          wishClass[p.id].style.color = 'white';
        }
      }
    }
  }

  })

  this.productService.searchData.subscribe((res:any)=>{
    if(res){
          this.cloneProduct = [];
          this.cloneProduct = res ? res : [""];
          this.resultData = this.cloneProduct;
          let product_wraper:any = (document.getElementById('product-listing')!);
          let searchProduct:any = (document.getElementById('searchProduct')!);
          product_wraper.style.display="none";
          searchProduct.style.display="block";
    } 
  });
   
 let priceFilter:any = document.querySelector('#priceFilter');

  priceFilter.addEventListener('change', (e)=>{
    this.priceValue = e.target.value;
    this.priceFiltredProduct = [];
    this.priceFiltredProduct = this.tempAllProduct.filter((prod: any)=>{
          if(this.priceValue !=0 || this.priceValue == null){
           return prod.salePrice <= this.priceValue;
          }
         });
     this.wholeProducts = [];   
     this.wholeProducts = this.priceFiltredProduct; 
    console.log("this.wholeProducts", this.wholeProducts);
  })

  } // END ngOnIt();

 // Product Search
  productSearch(){
    this.productService.searchData.subscribe((res:any)=>{
      if(res){
            this.cloneProduct = [];
            this.cloneProduct = res ? res : [""];
            this.resultData = this.cloneProduct;
            let product_wraper:any = document.getElementById('product-listing');
            let searchProduct:any = document.getElementById('searchProduct');
            product_wraper.style.display="none";
            searchProduct.style.display="block";
      } 
    });
  }
 
 // ALL Products
 getAllproducts(){
    this.sellerService.getAllProducts().subscribe(res=>{
     if(res && res !==null && res !==undefined) {
      this.isLoading = true;
      this.tempAllProduct = res ? res : [];
        this.wholeProducts =  res ? res : [];
     } else if (res == null || res == undefined){
          this.wholeProducts = [];
     }
   });
 }
// Get ALL Category
getAllCategory(){
  this.sellerService.getAllCategories().subscribe(res=>{
    this.categoriesList = res ? res : [""];
  })
}
// Get All Brand 
getAllBrands(){
  this.productService.getGenericAllBrands().subscribe(res=>{
  this.allBrands = res ? res : [""];
})
}
// Category Filter 
selectCategory(event:any){
  this.flag = true;
  if(event.target.checked==true){
    this.filteredProduct = this.tempAllProduct.filter((p:any)=>p.category == event.target.value);
    this.cloneProduct = this.cloneProduct.concat(this.filteredProduct);
    console.log("Clone Products", this.cloneProduct);
  } else {
    this.cloneProduct = this.cloneProduct.filter((item)=>{return item.category !== event.target.value});
    if(this.cloneProduct.length == 0 || this.cloneProduct == null){
      this.flag = false;
    }
  }
}
// Brand Filter
brandFilter(event:any){
  this.flag = true;
  if(event.target.checked==true){
    this.filteredProduct = this.tempAllProduct.filter((product:any)=>{ return product.brand == event.target.value});
   this.cloneProduct = this.cloneProduct.concat(this.filteredProduct);
  } else{
    this.cloneProduct = this.cloneProduct.filter((product:any)=>{return product.brand !== event.target.value});
    if(this.cloneProduct.length == 0 || this.cloneProduct == null ) {this.flag = false;}
  }
}

// Brand Filter
sizeFilter(event:any){
  this.flag = true;
  if(event.target.checked==true){
    this.filteredProduct = this.tempAllProduct.filter((product:any)=>{ return product.size == event.target.value});
   this.cloneProduct = this.cloneProduct.concat(this.filteredProduct);
  } else{
    this.cloneProduct = this.cloneProduct.filter((product:any)=>{return product.size !== event.target.value});
    if(this.cloneProduct.length == 0 || this.cloneProduct == null ) {this.flag = false;}
  }
}

// Price Filter 
// priceFilter(eventHandler){
//   let inputValue = parseInt(eventHandler.target.value) ;
//   let priceValue:any = document.querySelector('#priceValue');
//    priceValue.textContent = inputValue*inputValue;
//    inputValue = parseInt(priceValue.textContent);
//    this.wholeProducts = this.wholeProducts.filter((prod: any)=>{
//     if(inputValue !=0 || inputValue == null){
//      return prod.salePrice <= inputValue;
//     }
//    });
    
// } 
// Arrow toggles
categoryToggle(){
  this.arrowIcon = !this.arrowIcon;
}
 
brandToggle(){
  this.brandIcon = !this.brandIcon;
}

sizeToggle() {
this.sizeFlag = !this.sizeFlag;
}

 // Add product in your wishlist
 wishlistItem(productId: string) {
  if (localStorage.getItem('userToken')) {
    this.wishlistId = document.getElementById(productId);
    const userId = JSON.parse(localStorage.getItem('tempData')!)._id;
    let dataCollection = {
      userId: userId,
      productId: productId,
      productFlag: true
    }
    // Remove product from wishlist 
    this.productService.wishlisted_Products().subscribe((res: any) => {
      for (let item of res) {
        if (item?.id === productId) {
          this.productService.genericDeleteWishlist(productId).subscribe(result => {
            this.wishlistId.style.backgroundColor = 'white';
            this.wishlistId.style.color = '#6c58ef';
            this.message.innerText = ` Product remove from wishlist`;
            this.alertSuccess.style.display = "block";
            
            setTimeout(() => {
              this.alertSuccess.style.display = "none";
            }, 3000);
          })
        }
      }
      // Add product in wishlist
      this.productService.genericWishlist(dataCollection).subscribe((res: any) => {
        if (res.status == true) {
          this.wishlistId.style.backgroundColor = '#6c58ef';
          this.wishlistId.style.color = 'white';
          this.message.innerText = ` Product addedd successfully in wishlist`;
          this.alertSuccess.style.display = "block";
          
          setTimeout(() => {
            this.alertSuccess.style.display = "none";
          }, 3000)
        }
      });
    })

  } else {
    this.router.navigate(['/user/login']);
  }
}


// Sort by popularity
popularity() {
  this.lowHigh = "";this.hightLw = "";this.trend = ""; this.popular = "popularity";
  this.getAllproducts();
}

// Sort by popularity
lowHight() {
  this.popular = "";this.hightLw = "";this.trend = "";this.default = "";this.lowHigh = 'lowHight';
   this.wholeProducts.sort((a:any, b:any)=>Number(a.salePrice) - Number(b.salePrice));
}

// Sort by popularity
hightLow() {
  this.lowHigh = "";this.popular = "";this.trend = "";this.default = ""; this.hightLw = "hightLo";
  this.wholeProducts.sort((a:any, b:any)=>Number(b.salePrice) - Number(a.salePrice));
}

// Sort by popularity
newTrend() {
  this.lowHigh = "";this.popular = "";this.hightLw = "";this.default = "";this.trend = "newTrends";
  this.getAllproducts();
  
}

// product Not Found
productNotFound(n: number):Array<number> {
  return Array(n)
}


displayStyle = "none"; 
  
openPopup() { 
  this.displayStyle = "block"; 
} 
closePopup() { 
  this.displayStyle = "none"; 
} 
 

} //END CLASS HERE
