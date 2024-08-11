import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  wholeProducts: any = [];

  isHidden!:boolean;

  popup:boolean = false;

  page:number = 1;

  count:number = 0;

  tableSize:number = 10;

  tableSizes:any = [5, 10, 15, 20];

  p: number = 1;
 
  constructor(private productService: SellerService) { }
   
  ngOnInit(): void {
    this.getAllProduct();
  }

  //**************** Get All Product Records ******************//
  getAllProduct() {
    this.productService.getAllProducts().subscribe(res => {
      this.wholeProducts = res ? res : " ";
    });
  }

  //**************** Delete Product Record ******************//
  deleteOneProduct(id: number) {
    let cofm = confirm("Are you sure want to delete product?")
    if(cofm){
      this.productService.deleteProduct(id).subscribe((res) => {
        if (res && res !=null) {
          this.getAllProduct();
        }
        this.getAllProduct();
      });
    }
  }

  // Pagination 
  onTableDataChange(event:any){
   this.page = event;
   this.wholeProducts.length/10;
  }

  onTableSizeChange(event:any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllProduct();
  }

}
