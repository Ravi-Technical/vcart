import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';
import { newProductInterface } from '../../models/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: any;
  color = ["Red", "Green", "Yellow", "Black", "White"];
  sizes = ["S", "M", "L", "XL", "XXL"];
  detailProduct: any = [];
  selectedIndex: any;
  selectedSize: any;
  newProduct: any = [];
  cartFlag: boolean = false;
  getAddedProduct = [];
  setLocalProduct: any = [];
  existsProduct: any = [];
  wishlistId;
  alertSuccess!: any;
  message: any = "";

  constructor(private dataSource: ProductService, private routes: ActivatedRoute, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    if(localStorage.getItem('products') && localStorage.getItem('products')  !== 'undefined'){
      this.existsProduct = JSON.parse(localStorage.getItem('products')!);
    }
    
    //this.existsProduct = this.existsProduct ? this.existsProduct : "";
    this.alertSuccess = document.getElementById('alertSuccess');
    this.message = document.getElementById('message');
    this.productId = this.routes.snapshot.paramMap.get('id');
    if (this.existsProduct !== null && this.existsProduct.length > 0) {
      const alreadyAddedProduct = this.existsProduct?.find((p: any) => p.id === this.productId);
      if (alreadyAddedProduct) {
        this.cartFlag = true;
        this.dataSource.cartItem.next(this.existsProduct.length);
      } else {
        this.cartFlag = false;
      }
    }
    this.getProduct();

    // Default wishlist product display
    let wishClass: any = document.getElementById('wishlist');
    this.dataSource.wishlisted_Products().subscribe((res: any) => {
      if (res && res !== null && res !== undefined) {
        for (let wp of res) {
          if (wp?.id === this.productId) {
            wishClass.style.backgroundColor = "#6c58ef"
            wishClass.style.color = "white"
          }
        }
      }
    });
    
  } // ngOnInit() END HERE

  // Get Single Product By Id 
  getProduct() {
    this.productId = this.routes.snapshot.paramMap.get('id');
    this.dataSource.getSingleGenericProduct(this.productId).subscribe((res: any) => {
      this.detailProduct = res ? res : [""];
    })
  }

  getColor(color: any, i: number) {
    this.selectedIndex = i;
  }

  getSize(size: any, i: number) {
    this.selectedSize = i;
  }

  //********** Add to Cart ************//
  
  addToCart(product:newProductInterface[]) {
    let currentProduct = product;
    if(this.existsProduct == null || this.existsProduct.length == 0 || this.existsProduct ==undefined){
        localStorage.setItem('products', JSON.stringify([currentProduct]));
        let add_to_cart1 = JSON.parse(localStorage.getItem('products')!);
        this.dataSource.cartItem.next(add_to_cart1.length);
        this.cartFlag = true;
    } else {
      let add_to_cart = JSON.parse(localStorage.getItem('products')!);
      localStorage.setItem('products', JSON.stringify(add_to_cart.concat(product)));
      let add_to_cart2 = JSON.parse(localStorage.getItem('products')!);
      this.dataSource.cartItem.next(add_to_cart2.length);
      this.cartFlag = true;
    }
  }

  //********** Checkout Method  ************//
  goToCheckOut(product: any) {
     if(this.existsProduct == null || this.existsProduct.length == 0 || this.existsProduct == undefined){
        localStorage.setItem('products', JSON.stringify([product]));
        let current_add_to_cart = JSON.parse(localStorage.getItem('products')!);
        this.dataSource.cartItem.next(current_add_to_cart.length);
        this.router.navigate(['shop/checkout']);
     }  
      const isExistProduct = this.existsProduct.find((ele)=> { return ele.id === product.id; });
      if(isExistProduct){
        this.router.navigate(['shop/checkout']);
      } else {
        localStorage.setItem('products', JSON.stringify(this.existsProduct.concat(product)));
        let curr_And_Exist_Product = JSON.parse(localStorage.getItem('products')!);
        this.dataSource.cartItem.next(curr_And_Exist_Product.length);
        this.router.navigate(['shop/checkout']);
      } 

  }

  // Go To Cart Page
  goToCart() {
    this.router.navigate(['/shop/viewcart'])
  }

  // wishlist method
  wishlistItem(pId: string) {
    if (localStorage.getItem('userToken')) {
      this.add_wishlist_product();
      this.remove_wishlist_product();
    } else {
      this.router.navigate(['/user/login']);
    }
  }

  // Add product in wishlist 
  add_wishlist_product() {
    const userId = JSON.parse(localStorage.getItem('tempData')!)._id;
    this.wishlistId = document.getElementById('wishlist');
    let dataCollection = {
      userId: userId,
      productId: this.productId,
      productFlag: true
    }
    this.dataSource.genericWishlist(dataCollection).subscribe((res: any) => {
      if (res.status !== false) {
        this.wishlistId.style.backgroundColor = '#6c58ef';
        this.wishlistId.style.color = 'white';
        this.alertSuccess.style.display = "block";
        this.message.innerText = " Wishlist product has been added successfully";
        setTimeout(() => {
          this.alertSuccess.style.display = "none";
        }, 3000)
      }
    })
  }
 
  // Remove wishlist product
   remove_wishlist_product(){
    this.dataSource.wishlisted_Products().subscribe((res: any) => {
      if (res && res !== null && res !== undefined) {
        for (let wp of res) {
          if (wp.id === this.productId) {
            this.dataSource.genericDeleteWishlist(this.productId).subscribe(result=>{
              if(result){
                this.wishlistId.style.backgroundColor = "white"
                this.wishlistId.style.color = "#6c58ef"
                this.alertSuccess.style.display = "block";
                this.message.innerText = " Wishlist product has been deleted successfully";
                setTimeout(() => {
                this.alertSuccess.style.display = "none";
                }, 3000)
              }
            })
            
          }
        }
      }
    })
   }



} // END CLASS HERE


