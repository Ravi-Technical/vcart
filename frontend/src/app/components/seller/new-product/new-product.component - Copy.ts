import { Component, ElementRef, OnInit } from '@angular/core';
import { newProductInterface } from '../../models/product.interface';
import { SellerService } from 'src/app/@core/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { variableModel } from '../../models/product';
 


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  sellerReg: any;
  imgUrl = "http://via.placeholder.com/180";
  closeFlag: boolean = false;
  close: any;
  discount!: number;
  productTypeFlag:boolean = false;
  productImagebase64:any;
  sizes = ["S", "M", "L", "XL", "XXL"];
  colors = ["Multicolor", "Beige", "Black", "Blue", "Brown", "Dark Blue", "Dark Green", "Gold", "Green", "Grey", "Light Blue", "Light Green", "Maroon",
    "Multicolor", "Navy Blue", "Orange", "Pink", "Purple", "Red", "Silver", "White", "Yellow"];
  brands:any = [];
  categories:any = [];
  vProductFlag:boolean = false; 
  vProductModel = new variableModel();
  variablForm:any = [];
  vImgUrl:any = " ";
  constructor(private eleRef: ElementRef, private productService: SellerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.variablForm.push(this.vProductModel);
    this.allProductCategory();
    this.getAllBrands();
  }
  // ****** Add New Product ******//
  sellerRegister(form: newProductInterface) {
    
    console.log("before Seller form data", form);
    if(!form.isFeatured){
      form.isFeatured = false;
    }
    const sPrice = form.salePrice;
    const rPrice = form.regularPrice;
    this.discount = 100 - Math.ceil((sPrice / rPrice) * 100);
    let date = Date.now();
    let dateTime = new Date(date);
    
    let addonFields = {
      dateTime: dateTime.toLocaleString('en-IT'),
      discount: this.discount,
      quantity : 1,
      image:this.productImagebase64.name
    }

    Object.assign(form, addonFields);
    
    console.log("After Seller form data => ", form);
    this.productService.addNewProduct(form).subscribe(res => {
      if (res && res != "") {
        alert("New Product has been created successfully");
        this.router.navigate(['/seller/product-list']);
      }
    });
  }
  //***************** Get All Category ******************//
  allProductCategory(){
    this.productService.getAllCategory().subscribe(res=>{
      let loggedIn = localStorage.getItem('name');
      if(loggedIn){
        this.categories = res ? res : '';
      }
     })
  }
  //********************** Get Brands ************************//
  getAllBrands(){
    this.productService.getAllBrand().subscribe(res=>{
      let loggedIn = localStorage.getItem('name');
      if(loggedIn){
        this.brands = res ? res : '';
      }
    })
  }
  // ****** Show Product Image ******//
  imagePreview(event: any) {
    
    if (event.target.files && event.target.files[0] ) {
      this.closeFlag = true;
      //this.productImagebase64 = <File>event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = ()=>{
        this.productImagebase64 = reader.result;
      }
      this.imgUrl = URL.createObjectURL(event.target.files[0]);
      console.log(this.imgUrl);
    }
  }

  //************** Variable Product Images Gallery *****************//
  // imagesPreview(event:any, i:number){
  //   if(event.target.files[0] && event.target.files[0] !=null){
  //     let fileReader = new FileReader();
  //     fileReader.readAsDataURL(event.target.files[0]);
  //     fileReader.onloadend = ()=>{
  //       this.vImgUrl = fileReader.result;
  //       //console.log(this.vImgUrl)
  //     }
  //   }
 
  // }
  //************** Rremove Variable Product Image **********//
  // removeImgs(index:number){
  //   if(index){
  //     let aa = document.getElementById("imgPreview");
  //     aa?.removeAttribute('src');
  //     this.vProductFlag = false;
  //   }
  // }

  // ****** Remove Preview of Product ******//
  removeImg() {
    let aa = document.getElementById("imgPreview");
    let uploadImg: any = document.getElementById("uploadProduct");
    aa?.removeAttribute('src');
    aa?.setAttribute('src', 'http://via.placeholder.com/180');
    this.closeFlag = false;
    uploadImg.value = "";
  }
    // ****** Check the product type ******//
  // getProductType(event:any){
  //   let product_type = event.target.value;
  //   if(product_type=='Variable Product'){
  //     this.productTypeFlag = true;
  //   } else {
  //     this.productTypeFlag = false;
  //   }
  // }

  // addRow(){
  //   let newFormData = new variableModel();
  //   this.variablForm.push(newFormData);
  //   for(let item of this.variablForm){
  //     if(item.color && item.size){
  //       item.color = item.color;
  //       item.size = item.size;
  //       item.image = this.vImgUrl;
  //     }
  //   }
  //   console.log(this.variablForm);
  // }


} // ********** END Class Here  **********//
