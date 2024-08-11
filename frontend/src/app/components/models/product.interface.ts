
export interface newProductInterface {
    name:string,
    shortDescription:string,
    longDescription:string,
    image:string,
    brand:string,
    color:string,
    regularPrice:number,
    salePrice:number,
    size:string,
    category:string,
    countInStock:number,
    rating:number,
    isFeatured:boolean | false,
    discount:number,
    quantity:number
 }

 export interface category {
    catName:string,
    icon:string,
    color:string
  }

  export interface Brand {
   brandName:string,
   icon:string,
   color:string
  }

  export interface Seller{
   name:string,
   email:string,
   password:string,
   address:string
  }

  export interface SellerLogin{
   email:string,
   password:string
  }

  export interface variableProductModel {
   image:string;
   size:string;
   color:string;
}