import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Seller, SellerLogin, category, newProductInterface } from '../components/models/product.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerService {

  apiUrl = "https://vcart-backend-1kvp.onrender.com/api/v1/";

  isSellerLoggedIn = new Subject<string>();

  sellerLogOut = new Subject<boolean>();

  constructor(private _http: HttpClient) { }

  //************************************ Product API's ****************************************//
  // Add New Product from Here
  addNewProduct(newProduct: newProductInterface) {
    return this._http.post(`${this.apiUrl}${"product/add-new"}`, newProduct);
  }
  //********************* Get All Products ***********************//
  getAllProducts() {
    return this._http.get(`${this.apiUrl}product`);
  }
  
  //********************* Get All Products ***********************//

  getFeaturedProducts(){
    return this._http.get(`${this.apiUrl}product/get/featured`);
  }

  //**************** Get Product By Id ***************/
  getSingleProduct(id: number) {
    return this._http.get(`${this.apiUrl}product/${id}`);
  }
  // Update one product by id
  updateProduct(id: number, data: newProductInterface) {
    return this._http.put(`${this.apiUrl}product/edit/${id}`, data);
  }

  // Delete product
  deleteProduct(id: number) {
    return this._http.delete(`${this.apiUrl}product/delete/${id}`);
  }
  
  // Product Search 
  searchProduct(data:any){
    return this._http.get(`${this.apiUrl}product/search`, data)
  }
 
 //************************************ Category API's ****************************************//
 
  // Get All Product Category 
  getAllCategory(){
    return this._http.get(`${this.apiUrl}category`);
  }
  // Get All Categories for shop page 
  getAllCategories(){
    return this._http.get(`${this.apiUrl}category/categories`);
  }
  // Add New Category
  addNewCategory(newCateogry:category){
    return this._http.post(`${this.apiUrl}category/add-new`, newCateogry);
  }

   // Delete Category
   deleteCategory(id:number){
    debugger
    return this._http.delete(`${this.apiUrl}category/delete/${id}`);
  }

   // Get Category By Id
   getCategoryById(id:number){
    return this._http.get(`${this.apiUrl}category/get/${id}`);
  }

  // Update Category
  updateCategory(id:number, data:category){
    return this._http.put(`${this.apiUrl}category/edit/${id}`, data);
  }

  //***************************
  /******** Brand API's 
  ****************************/

  // Add New Brand
  addNewBrand(data:Brand){
  return this._http.post(`${this.apiUrl}brand/add-new`, data);
  }
  // Get All Brand
  getAllBrand(){
  return this._http.get(`${this.apiUrl}brand/all-brands`);
  }
  // Delete Single Brand 
  deleteBrand(id:number){
  return this._http.delete(`${this.apiUrl}brand/delete/${id}`);
  }
  // update Brand 
  updateBrand(id:number, data:Brand){
   return this._http.put(`${this.apiUrl}brand/edit/${id}`, data);
  }
  // Get Single Brand 
  getSingleBrand(id:number){
   return this._http.get(`${this.apiUrl}brand/get-brand/${id}`);
  }

  //*************************** Seller Login, Register & Profile API's ****************************/
  registerSeller(seller:Seller){
    return this._http.post(`${this.apiUrl}seller/register`, seller);
  }
  
  sellerLogin(loginData:SellerLogin){
    return this._http.post(`${this.apiUrl}seller/login`, loginData);
  }

  sellerProfile(){
    return this._http.get(`${this.apiUrl}seller/profile`);
  }

  genericSellerUpdate(profileObj:any){
    return this._http.put(`${this.apiUrl}seller/profile-update`, profileObj); 
  }

  genericSellerForgetPassword(email:string){
    return this._http.post(`${this.apiUrl}seller/forgot-password`, email);
  }

  genericSellerResetPassword(dataobj:any){
    return this._http.post(`${this.apiUrl}seller/reset-password`, dataobj);
  }

//  ************************************* Chart API ****************************************** //
 charts(){
  return this._http.get(`${this.apiUrl}chart`);
 }


} // END CLASS HERE



