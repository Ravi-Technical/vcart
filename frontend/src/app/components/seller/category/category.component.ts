import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { category } from '../../models/product.interface';
import { SellerService } from 'src/app/@core/seller.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  
  @ViewChild('category') categoryForm:NgForm | undefined;

  @ViewChild('updateCat') updateCat:NgForm | undefined;

  @ViewChild('message') message!:ElementRef;

  categories: any = [];

  displayMessage = "";

  flag:boolean = false;

  flag1:boolean = false;

  updateBtn:boolean = false;
 
  categoryId!:number;

  p: number = 1;

  catModel:any = {
    catName:"",
    icon:"",
    color:""
  } 


  constructor(private dataSoruce: SellerService, private el:ElementRef) {}

  ngOnInit(): void {
    this.getCategories();
  }

  //************************** Get All Category **************************//
  getCategories() {
    this.dataSoruce.getAllCategory().subscribe((res:any) => {
      if(localStorage.getItem('sellerToken')){
        this.categories = res ? res : '';
        console.log("this.categories ", this.categories );
      } else{
        console.log("Category Not Found!");
      }
    });
  }

  //**************************** Add New Category ******************************//
  addCategory(category: category) {
    this.dataSoruce.addNewCategory(category).subscribe((res)=>{
      this.flag = true;
      this.displayMessage = "Category has been added successfully";
      setTimeout(()=>{
        this.flag = false;
      }, 2000)
      this.categoryForm?.reset();
      this.getCategories();
    })
  }
  //**************************** Delete Category ******************************//
  deleteCategory(id:number){
    console.log("cat Id", id);
    let result = confirm("Are you sure to delete category");
    if(result==true){ 
      this.dataSoruce.deleteCategory(id).subscribe((res)=>{
        this.flag1 = true;
        this.displayMessage = "Category has been deleted successfully";
        setTimeout(()=>{
          this.flag1 = false;
        }, 2000);
        this.getCategories();
      })
    }
  }
   //**************************** Get Category By Id ******************************//
  getCategory(id:number){
     this.categoryId = id;
     this.updateBtn = true;
     this.dataSoruce.getCategoryById(id).subscribe((res)=>{
      console.log(res);  
      this.catModel = res ? res : "";
      //this.updateBtn = false;
     })
  }
   //**************************** Update Category ******************************//
  updateCategory(data:any){
      this.dataSoruce.updateCategory(this.categoryId, data).subscribe((res)=>{
      this.flag = true;
      this.displayMessage = "Category has been updated successfully";
      setTimeout(()=>{
        this.displayMessage = "";
        this.flag = false;
      }, 2000);
      this.updateBtn = false;
      this.updateCat?.reset();
      this.getCategories();
    })
  }



} // END CLASS HERE



 

