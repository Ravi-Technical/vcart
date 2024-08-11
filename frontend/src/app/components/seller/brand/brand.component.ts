import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand, category } from '../../models/product.interface';
import { NgForm } from '@angular/forms';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  @ViewChild('brand') brand:NgForm | undefined;
  AllBrands:any = [];
  p:number = 1;
  message = "";
  flag:boolean = false;
  flag1:boolean = false;
  BrandId!:any;
  updateForm:boolean = false;
  Brand:any = {
    brandName: '',
    icon: '',
    color: ''
  }
constructor(private dataSource:SellerService){
  this.getAllBrands();
}

ngOnInit(): void {
  this.getAllBrands();
}
// Add New Brand Here
addBrand(brand:Brand){
 this.dataSource.addNewBrand(brand).subscribe(res=>{
  this.flag = true;
  this.message = "Brand has been created successfully";
  setTimeout(()=>{
    this.flag = false;
  }, 2000);
  this.getAllBrands();
 })
 this.brand?.reset();
}
// Get All Brands
getAllBrands(){
  this.dataSource.getAllBrand().subscribe((res:any)=>{
    if(localStorage.getItem('sellerToken')){
      this.AllBrands = res ? res : '';
    }
  },
    
  )
}
// Delete Brand
deleteBrand(id:number){
   this.dataSource.deleteBrand(id).subscribe((res)=>{
      this.flag1 = true;
      this.message = "Brand has been deleted successfully";
      setTimeout(()=>{
        this.flag1 = false;
        this.message = "";
      }, 2000);
      this.getAllBrands();
   });
}
// Update Brand 
updateBrand(id:number){
  console.log("Update Id", id);
  this.BrandId = id;
  this.updateForm = true;
  this.dataSource.getSingleBrand(id).subscribe((res)=>{
    this.Brand = res ? res : '';
  })
 }

// Submit Update Form 
submitUpdate(updateData:Brand){
   this.dataSource.updateBrand(this.BrandId, updateData).subscribe((res)=>{
    this.flag = true;
    this.message = "Brand has been updated successfully";
    setTimeout(()=>{
      this.flag = false;
    this.message = "";
    }, 2000);
    this.updateForm = false;
    this.getAllBrands();
   })
}

} // END CLASS HERE
