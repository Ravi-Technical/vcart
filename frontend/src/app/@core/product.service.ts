import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { userLoginModel, userRegisterModel } from '../components/models/userModel';
import { addToCartModel } from '../components/models/product';
import { Subject } from 'rxjs';

//import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  cartItem = new Subject<number>();

  isUserLoggedIn = new Subject<string>();

  userLogOut = new Subject<boolean>();

  storeData = new Subject<string>();

  searchData = new Subject<string>();
  
  apiUrl = "https://vcart-backend-1kvp.onrender.com/api/v1";

  testApi = 'http://localhost:4000/upload';

  constructor(private http:HttpClient) { }



   //******************* Get All Brands ******************//

   getGenericProductsCall(){
      return this.http.get(`${this.apiUrl}/product`);
   }

  //******************* Get All Brands ******************//
   getGenericAllBrands(){
    return this.http.get(`${this.apiUrl}/brand/getAllBrands`);
   }

   //******************* Get Single Product By Id ******************//
   getSingleGenericProduct(id:string){
    return this.http.get(`${this.apiUrl}/product/details/${id}`);
   }
 
   //******************* Add To Cart Item ******************//
    addToCartProduct(cartItem:addToCartModel){
      return this.http.post(`${this.apiUrl}/addToCart`, cartItem);
    }

  //***************** Get Cart Item ******************//  
  //  getCartItem(){
  //   return this.http.get(`${this.apiUrl}/getCartItem`);
  //  }

    //***************** New User Register ******************// 
   genericUserRegister(newUserData:userRegisterModel){  
    return this.http.post<any[]>(`${this.apiUrl}/user/register`, newUserData)
   }

   //*********************** User Login ***************************//
   genericUserLogin(loginUser:userLoginModel){
    return this.http.post(`${this.apiUrl}/user/login`, loginUser);
   }

   //*********************** Find All User Details ***************************//
   allAuthorizedUser(){
   return this.http.get(`${this.apiUrl}/user/allUser`);
   }

   //*********************** Order API ***************************//
  
    genericOrderSubmit(orderDetails:any) {
      return this.http.post(`${this.apiUrl}/order`, orderDetails);
    }
   
    //*********************** Update User Details ***************************//
    updateCurrentUser(userDetails:any){
     return this.http.put(`${this.apiUrl}/user/updateUser`, userDetails);
    }

     //*********************** End User Wishlist ***************************//
     genericWishlist(wishListData:any){
      return this.http.post(`${this.apiUrl}/user/wishlist`, wishListData);
     }
     
     //*********************** Wishlist Products ***************************//
     wishlisted_Products(){
      return this.http.get(`${this.apiUrl}/user/wishlist-product/`);
     }

     //*********************** Update Wishlist Product ***************************//
     genericDeleteWishlist(id:string){
       return this.http.delete(`${this.apiUrl}/user/update-wishlist-product/${id}`);
     }
     

    //*********************** Product Search ***************************//
     genericProductSearch(keyword:string){
      return this.http.get(`${this.apiUrl}/product/search/${keyword}`);
     }
    
     //*********************** Forget Password ***************************//
     genericForgotPassword(email:string){
      return this.http.post(`${this.apiUrl}/user/forgot-password`, email);
     }

     //*********************** Reset Password ***************************//
     genericResetPassword(dataObj:any){
      return this.http.post(`${this.apiUrl}/user/reset-password`, dataObj);
     }
  
     //*********************** Get Ordred List ***************************//
    genericOrdredList(userId:string){
       return this.http.get(`${this.apiUrl}/order-list/${userId}`);
    }
   
    //*********************** Get Single User Wishlist Items ***************************//
    single_User_Wishlist_product(unqiueId:string){
      return this.http.get(`${this.apiUrl}/user/unique-wishlist-product/${unqiueId}`);
    }



   testApi1(data:any){
      return this.http.post(`${this.testApi}`, data)
   }

   uploadImage(data:any){
    const headers = new HttpHeaders();
    return this.http.post(`${this.testApi}`, data, {
      headers:headers
    });
  }

















     

} // END SERVICE HERE
