import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/@core/product.service';
import { SellerService } from 'src/app/@core/seller.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import  app  from "src/app/firebase"



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

  featuredProducts: any = [];

  img:any;

  shortName: any;

  reloadPage: number = 1;

  test: any = [];

  pId: any = [];

  wishlistId!: any;

  alertSuccess!: any;

  toggle!: boolean;

  message: any = "";

  formBuilder: any;

  isLoading!:boolean;
 
  constructor(private dataSource: SellerService, private _productService: ProductService, private router: Router, private config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.alertSuccess = document.getElementById('alert-success');
    this.message = document.getElementById('message');
    // Featured Products
    this.dataSource.getFeaturedProducts().subscribe(res => {
      if(res && res !==undefined && res !==null) {
        this.isLoading = true;
        this.featuredProducts = res ? res : [];
      } else if(res == null || res == undefined){
        this.isLoading = false;
        this.featuredProducts = [];
      }
    });
    this._productService.wishlisted_Products().subscribe((res: any) => {
      let wishClass: any = document.getElementsByClassName('wishlist');
      for (let p of this.featuredProducts) {
        for (let result of res) {
          if (p?._id === result?._id) {
            wishClass[p.id].style.backgroundColor = '#6c58ef';
            wishClass[p.id].style.color = 'white';
          }
        }
      }
    })

  } // END ngOnInit();

  // Add product in your wishlist
  wishlistItem(productId: string, event) {
    if (localStorage.getItem('userToken')) {
      this.wishlistId = document.getElementById(productId);
      const userId = JSON.parse(localStorage.getItem('tempData')!)._id;
      let dataCollection = {
        userId: userId,
        productId: productId,
        productFlag: true
      }
      // Remove product from wishlist 
      this._productService.wishlisted_Products().subscribe((res: any) => {
        for (let item of res) {
          if (item.id === productId) {
            this._productService.genericDeleteWishlist(productId).subscribe(result => {
              this.wishlistId.style.backgroundColor = 'white';
              this.wishlistId.style.color = '#6c58ef';
              this.alertSuccess.style.display = "block";
              this.message.innerText = ` Product removed successfully from wishlist`;
              setTimeout(() => {
                this.alertSuccess.style.display = "none";
              }, 2000);
            })
          }
        }
        // Add product in wishlist
        this._productService.genericWishlist(dataCollection).subscribe((res: any) => {
          if (res.status == true) {
            this.wishlistId.style.backgroundColor = '#6c58ef'; 
            this.wishlistId.style.color = 'white';
            this.alertSuccess.style.display = "block";
            this.message.innerText = ` Product added successfully in wishlist`;
            setTimeout(() => {
              this.alertSuccess.style.display = "none";
            }, 2000)
          }
        });
      })

    } else {
      this.router.navigate(['/user/login']);
    }
  }

  // Repeat element in loop
  productNotFound(n: number):Array<number> {
    return Array(n)
  }

  // Go to shop page
  gotoShop() {
      this.router.navigate(['/shop/products']);
  }

 

} // END CLASS HERE
 