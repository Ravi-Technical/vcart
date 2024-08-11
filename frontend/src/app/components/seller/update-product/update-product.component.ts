import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from 'src/app/@core/seller.service';
import { newProductInterface } from '../../models/product.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('updateProd') updateProd:NgForm | undefined
  productId: any;
  imgUrl = "http://via.placeholder.com/180";
  closeFlag: boolean = false;
  productModel: newProductInterface = {
    name: '',
    shortDescription: '',
    longDescription: '',
    countInStock: 0,
    salePrice: 0,
    regularPrice: 0,
    size: '',
    color: '',
    image: '',
    discount: 0,
    brand: '',
    category: '',
    rating: 0,
    isFeatured: false,
    quantity: 0
  }

  sizes = ["S", "M", "L", "XL", "XXL", "Free Size", 28, 30, 32, 34, 38, 40, 42];

  colors = ["Black & White", "Beige", "Black", "Blue", "Brown", "Dark Blue", "Dark Green",  "Sky Blue", "Gold", "Green", "Grey", "Light Blue", "Light Green", "Maroon",
    "Multicolor", "Navy Blue", "Orange", "Pink", "Purple", "Red", "Silver", "White", "Yellow"];

  brands:any = [];

  categories:any = [];

  categoryName:any = [];

  productImagebase64:any;

  constructor(private route: ActivatedRoute, private productService: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.getOneProduct();
    this.allProductCategory();
    this.allBrand();
  }

  // ****** Get Single Product By Id ******//
  getOneProduct() {
    this.productId = this.route.snapshot.paramMap.get("id");
    this.productService.getSingleProduct(this.productId).subscribe((res: any) => {
      this.productModel = res ? res : '';
      console.log("backend responve ==== ", this.productModel);
      this.imgUrl = res.image;
      this.closeFlag = true;
      // this.categoryName = this.productModel.category;
      //  this.categoryName = Object.entries(this.categoryName);
      /// this.productModel.category = this.categoryName;
      
    });
  }

  // ****** Get All Category ******//
  allProductCategory(){
    this.productService.getAllCategory().subscribe((res:any)=>{
      //console.log("======= All category =========", res);
      this.categories = res ? res : '';
     })
  }

  // ****** Get All Category ******//
  
  allBrand(){
    this.productService.getAllBrand().subscribe((res)=>{
      //console.log("========= All Brands =========", res);
      this.brands = res ? res : [""];
    })
  }

  //**************** Update Product ****************//
  UpdateProd(data: newProductInterface) {
    if(!data.image && data.image == ""){
      data.image = this.productModel.image;
    }
    data.image = this.productImagebase64;
    this.productService.updateProduct(this.productId, data).subscribe((res) => {
      if (res && res != "") {
        alert("Product has been updated successfully");
        this.router.navigate(['/seller/product-list']);
      }
    })
  }


  // ****** Show Product Image ******//
  imagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.closeFlag = true;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = ()=>{
        this.productImagebase64 = reader.result;
        console.log("fileRader", this.productImagebase64);
      }
      this.imgUrl = URL.createObjectURL(event.target.files[0]);
    }
  }

  // ****** Remove Preview of Product ******//
  removeImg() {
    let aa = document.getElementById("imgPreview");
    let uploadImg: any = document.getElementById("uploadProduct");
    aa?.removeAttribute('src');
    aa?.setAttribute('src', 'http://via.placeholder.com/180');
    this.closeFlag = false;
    uploadImg.value = "";
  }

}
