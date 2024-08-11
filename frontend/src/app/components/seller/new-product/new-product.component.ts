import { Component, ElementRef, OnInit } from '@angular/core';
import { newProductInterface } from '../../models/product.interface';
import { SellerService } from 'src/app/@core/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { variableModel } from '../../models/product';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import  app  from "src/app/firebase"
 


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  sellerReg: any;
  image:any;
  uploadImageUrl:any;
  imgUrl = "http://via.placeholder.com/180";
  loaderImg = 'https://firebasestorage.googleapis.com/v0/b/angapp-357111.appspot.com/o/products_images%2Floader_icon.gif?alt=media&token=cf72efde-cbf2-4d34-809a-9cca9cb7c7ab';
  closeFlag: boolean = false;
  close: any;
  discount!: number;
  productTypeFlag:boolean = false;
  productImagebase64:any;
  sizes = ["S", "M", "L", "XL", "XXL", "Free Size", 28, 30, 32, 34, 38, 40, 42];
  colors = ["Black & White", "Multicolor", "Beige", "Black", "Blue", "Brown", "Dark Blue", "Sky Blue", "Dark Green", "Gold", "Green", "Grey", "Light Blue", "Light Green", "Maroon",
    "Multicolor", "Navy Blue", "Orange", "Pink", "Purple", "Red", "Silver", "White", "Yellow"];
  brands:any = [];
  categories:any = [];
  vProductFlag:boolean = false; 
  vProductModel = new variableModel();
  variablForm:any = [];
  vImgUrl:any = " ";
  wraperLoader:any;

  constructor(private eleRef: ElementRef, private productService: SellerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.variablForm.push(this.vProductModel);
    this.allProductCategory();
    this.getAllBrands();
    this.wraperLoader = document.getElementById('wraperLoader');

  }

    // ****** Show Product Image ******//
     imagePreview(event: any) {
      if (event.target.files && event.target.files[0] ) {
        this.image =  event.target.files[0] as File;
        this.closeFlag = true;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = ()=>{
          this.productImagebase64 = reader.result;
        }
        this.imgUrl = URL.createObjectURL(event.target.files[0]); 
      }
    }

   async uploadImage(){
        let storage = getStorage(app);
        let storageRef = ref(storage, 'products_images/' + Date.now() + "_" + this.image.name);
        await uploadBytes(storageRef, this.image);
        this.uploadImageUrl = await getDownloadURL(storageRef); 
   }    

  // ****** Add New Product ******//
  async add_new_product(form: newProductInterface) {
    this.wraperLoader.style.display="block";
    let storage = getStorage(app);
    let storageRef = ref(storage, 'products_images/' + Date.now() + "_" + this.image.name);
    await uploadBytes(storageRef, this.image);
    this.uploadImageUrl = await getDownloadURL(storageRef);
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
      image: this.uploadImageUrl
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
