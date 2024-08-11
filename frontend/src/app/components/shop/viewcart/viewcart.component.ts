import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  getCartProduct: any = [];
  getPId: any = [];
  getFiltredProduct: any = [];
  storeAllGenericProduct: any = [];
  localProduct: any = [];
  totalPrice!: any;
  totalDiscount!: number;
  quantity: number = 1;

  // Save for later
  cardProduct: any = [];
  existProduct: any = [];
  genericSaveForLater:any = [];
  saveForLaterProduct:any = [];
  alertSuccess:any;message:any;alertSuccess1:any;
  alertSuccess2: any;

  constructor(private dataSource: ProductService, private router: Router) { }

  ngOnInit(): void { 
    this.alertSuccess = document.getElementsByClassName("alert-success");
    this.alertSuccess1 =  document.getElementsByClassName("save-notification");
    this.alertSuccess2 =  document.getElementsByClassName("moveToCarts");

    this.message = document.getElementById("message");
    this.getAllGenericProducts();
    this.genericSaveForLater = JSON.parse(localStorage.getItem('save-for-later')!);

  } //********** END ngOnInit() ***********//

  // ********************* Get All Generic Added Products ************************ //
  getAllGenericProducts() {
    let localStoreProduct = localStorage.getItem("products") !=='undefined' ? JSON.parse(localStorage.getItem('products')!):null;
    this.localProduct = localStoreProduct ? localStoreProduct : "";
    if (this.localProduct.length > 0) {

      this.localProduct.reduce((acc: any, item: any) => {
        this.totalPrice = acc + (item.salePrice * item.quantity);
        return this.totalPrice;
      }, 0);

      this.localProduct.reduce((acc: any, item: any) => {
        this.totalDiscount = acc + ((item.regularPrice * item.quantity) - (item.salePrice * item.quantity));
        return this.totalDiscount;
      }, 0);

    }
  }

  //********************* Decrease Product Qantity *************************//
  decrease(index: number) {
    if (this.quantity > 1) {
      this.quantity = this.localProduct[index].quantity--;
      this.quantity = this.quantity - 1;
      localStorage.setItem('products', JSON.stringify(this.localProduct));
      this.totalPrice = 0;
      this.totalDiscount = 0;
      for (let item of this.localProduct) {
        this.totalPrice += item.quantity * item.salePrice;
      }
      this.localProduct.some((val: any, i: number) => { this.totalDiscount -= (val.salePrice * val.quantity) - (val.regularPrice * val.quantity); });
    }
  }
  //************************ Increase Product Quantity *********************//
  increase(index: number) {
    if (this.quantity < 20) {
      this.quantity = this.localProduct[index].quantity++;
      this.quantity = this.quantity + 1;
      localStorage.setItem('products', JSON.stringify(this.localProduct));
      this.totalPrice = 0;
      this.totalDiscount = 0;
      this.localProduct.some((val: any, i: number) => { this.totalPrice += val.quantity * val.salePrice; });
      this.localProduct.some((val: any, i: number) => { this.totalDiscount += (val.regularPrice * val.quantity) - (val.salePrice * val.quantity); });
    }
  }

  //*********************** Remove Product From Cart ************************//
  removeItem(index: number) {
    const checkItem = confirm("Are you sure remove the item?");
    if (checkItem === true) {
      this.localProduct = JSON.parse(localStorage.getItem('products')!);
      this.localProduct.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.localProduct));
      this.dataSource.cartItem.next(this.localProduct.length);
      this.localProduct.reduce((acc: any, item: any) => { return this.totalPrice = acc + item.salePrice; }, 0);
      this.localProduct.reduce((acc: any, item: any) => { return this.totalDiscount = acc + (item.regularPrice - item.salePrice); }, 0);
      this.alertSuccess[0].style.display="block"
          setTimeout(()=>{
            this.alertSuccess[0].style.display="none" 
          }, 3000);
    }
  }

  //*********************** Save for later ************************//
  saveForLaterMethod(pId: string) {
    this.existProduct = JSON.parse(localStorage.getItem('save-for-later')!);
    this.cardProduct = JSON.parse(localStorage.getItem('products')!);
    if ( this.existProduct !== null && this.existProduct.filter((p: any) => { return p.id !== pId })) {
      this.alertSuccess1[0].style.display="block"
          setTimeout(()=>{
            this.alertSuccess1[0].style.display="none"
          }, 3000);
       const newFiltredProduct = this.cardProduct.filter((p: any) => p.id !== pId);
       localStorage.setItem('products', JSON.stringify(newFiltredProduct));
       this.dataSource.cartItem.next(newFiltredProduct.length);
       this.localProduct = [];
       this.localProduct = JSON.parse(localStorage.getItem('products')!);
        if (this.cardProduct.filter((p: any) => p.id === pId)) {
          this.saveForLaterProduct = this.cardProduct.filter((p: any) => p.id === pId);
          this.existProduct = this.existProduct.concat(this.saveForLaterProduct);
          localStorage.setItem('save-for-later', JSON.stringify(this.existProduct));
          this.genericSaveForLater = JSON.parse(localStorage.getItem('save-for-later')!);
          this.localProduct.reduce((acc: any, item: any) => { return this.totalPrice = acc + item.salePrice; }, 0);
          this.localProduct.reduce((acc: any, item: any) => { return this.totalDiscount = acc + (item.regularPrice - item.salePrice); }, 0);
        }
    } else{
      const save_for_later_item = this.cardProduct.filter((ele)=> {return ele.id !== pId});
      localStorage.setItem('products', JSON.stringify(save_for_later_item));
      if(localStorage.getItem('save-for-later') == null || localStorage.getItem('save-for-later') == undefined){
        localStorage.setItem('save-for-later', JSON.stringify(save_for_later_item));
      }
    }

  }

  // ******************** Move to cart *******************************//
  moveToCart(productId:string){
     const saveForLater = JSON.parse(localStorage.getItem('save-for-later')!);
     let cartProduct = JSON.parse(localStorage.getItem('products')!);
     if(saveForLater.filter((p:any)=> p.id !== productId )){
      this.alertSuccess2[0].style.display="block";
          setTimeout(()=>{
            this.alertSuccess2[0].style.display="none"; 
          }, 3000);
        localStorage.setItem('save-for-later', JSON.stringify(saveForLater.filter((p:any)=> p.id !== productId)));
        this.genericSaveForLater = JSON.parse(localStorage.getItem('save-for-later')!);
        // Merge product
        cartProduct = cartProduct.concat(saveForLater.filter((p:any)=> p.id === productId ));
        localStorage.setItem('products', JSON.stringify(cartProduct));
        this.dataSource.cartItem.next(cartProduct.length);
        this.localProduct = [];
        this.localProduct = JSON.parse(localStorage.getItem('products')!);
        this.localProduct.reduce((acc: any, item: any) => { return this.totalPrice = acc + item.salePrice; }, 0);
        this.localProduct.reduce((acc: any, item: any) => { return this.totalDiscount = acc + (item.regularPrice - item.salePrice); }, 0);
     }
  }

  // ******************** Remove product from save for later *******************************//
  removeSfl(productId:string){
    if(confirm("Are you sure want to remove product!")){
      const original_sfl = JSON.parse(localStorage.getItem('save-for-later')!);
      let filtredProduct =  original_sfl.filter((p:any)=> p.id !== productId);
      localStorage.setItem('save-for-later', JSON.stringify(filtredProduct));
      this.genericSaveForLater = JSON.parse(localStorage.getItem('save-for-later')!);
      this.alertSuccess[0].style.display="block"
      this.message.innerText = " Product has been removed successfully";
          setTimeout(()=>{
            this.alertSuccess[0].style.display="none" 
          }, 3000);
    }
    
  }
    


  //*********************** Go To Shop Page ************************//
  goToShop() {
    this.router.navigate(['/shop/products']);
  }

  //*********************** Go To Checkout Page ************************//
  goToCheckout() {
    this.router.navigate(['/shop/checkout'])
  }













}  //************** END CLASS *************//

