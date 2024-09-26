import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';

declare var Razorpay: any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('placeOrder') placeOrder !: ElementRef<HTMLInputElement>

  @ViewChild('onlinePayment') onlinePayment !: ElementRef<HTMLInputElement>

  wraperLoader;

  placeOrderBtnFlag:boolean = false;

  checkOutProduct: any = [];
  totalPrice!: number;
  totalDiscount!: number;
  quantity: number = 1;

  isLoggedIn: boolean = true;
  showLoggedDiv: boolean = false;
  name: any; email: any; city: any; state: any; pincode: any; address: any; phone: any; alternatePhone: any;
  showSuccess: any;
  decimalNumber; 
  

  constructor(public element: ElementRef, private dataSource: ProductService, private router: Router) {

    const userData: any = localStorage.getItem('tempData') !=='undefined' ? JSON.parse(localStorage.getItem('tempData')!):null;

    if (userData && userData !== null) {
      this.name = userData.name;
      this.email = userData.email,
        this.city = userData.city,
        this.state = userData.state,
        this.pincode = userData.pincode,
        this.address = userData.address,
        this.phone = userData.mobile,
        this.alternatePhone = userData.alternatePhone
    } else {
      this.name = "";
      this.email = "",
        this.city = "",
        this.state = "",
        this.pincode = "",
        this.address = "",
        this.phone = "",
        this.alternatePhone = ""
    }

  }

  ngOnInit(): void {
    if ( localStorage.getItem('userName') !==null && localStorage.getItem('userName') !==undefined && this.placeOrder !==undefined) {
        this.placeOrder.nativeElement.disabled = true;
    }
    this.wraperLoader = document.getElementById('wraperLoader');
    this.checkOutProducts();
    if (localStorage.getItem('userName')) {
      this.isLoggedIn = false;
      this.showLoggedDiv = true;
    } //
    this.decimalNumber = Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 2
    });
   

  } // END ngOnInit();

  //********************* Get Products from local storage *************************//
  checkOutProducts() {
    this.checkOutProduct = localStorage.getItem('products') !=='undefined' ? JSON.parse(localStorage.getItem('products')!):null;
    if (this.checkOutProduct !== null) {
      this.checkOutProduct.reduce((acc: number, p: any) => {
        this.totalPrice = acc + (p.quantity * p.salePrice);
        return this.totalPrice;
      }, 0);

      this.checkOutProduct.reduce((acc: number, p: any) => {
        this.totalDiscount = acc + ((p.regularPrice * p.quantity) - (p.salePrice * p.quantity));
        return this.totalDiscount;
      }, 0)
    }

  }
  //********************* Decrease Product Qantity *************************//
  decrease(index: number) {
   
    if (this.quantity > 1) {
      this.quantity = this.checkOutProduct[index].quantity--;
      this.quantity = this.quantity - 1;
      localStorage.setItem('products', JSON.stringify(this.checkOutProduct));
      this.totalPrice = 0;
      this.totalDiscount = 0;
      this.checkOutProduct.some((val: any, i: number) => { this.totalPrice += val.quantity * val.salePrice; });
      this.checkOutProduct.some((val: any, i: number) => { this.totalDiscount += (val.regularPrice * val.quantity) - (val.salePrice * val.quantity); });
      // for (let item of this.checkOutProduct) {
      //   this.totalPrice += item.quantity * item.salePrice;
      // }
      // this.checkOutProduct.some((val: any, i: number) => { this.totalDiscount -= (val.salePrice * val.quantity) - (val.regularPrice * val.quantity); });
    }
  }
  //************************ Increase Product Quantity *********************//
  increase(index: number) {
    
    if (this.quantity < 20) {
      this.quantity = this.checkOutProduct[index].quantity++;
      this.quantity = this.quantity + 1;
      localStorage.setItem('products', JSON.stringify(this.checkOutProduct));
      this.totalPrice = 0;
      this.totalDiscount = 0;
      this.checkOutProduct.some((val: any, i: number) => { this.totalPrice += val.quantity * val.salePrice; });
      this.checkOutProduct.some((val: any, i: number) => { this.totalDiscount += (val.regularPrice * val.quantity) - (val.salePrice * val.quantity); });
    }
  }

  //************************ Order Place *********************//
  orderPlace(data: any) {
    this.wraperLoader.style.display="block";
    const getProduct = localStorage.getItem('products') !=='undefined' ? JSON.parse(localStorage.getItem('products')!):null;
    const getUserDetail = localStorage.getItem('tempData') !=='undefined' ? JSON.parse(localStorage.getItem('tempData')!):null;
    let orderItems: any = [];
    let newTotalPrice = 0;
    for (let pId of getProduct) {
      newTotalPrice = newTotalPrice + pId.salePrice * pId.quantity;
      orderItems = orderItems.concat([{ quantity: pId.quantity, product: pId._id }])
    }
    data.totalPrice = newTotalPrice;
    data.orderItems = orderItems;
    data.user = getUserDetail._id;
    this.dataSource.genericOrderSubmit(data).subscribe((res) => {
      if (res && res != null) {
        localStorage.removeItem('products');
        this.dataSource.cartItem.next(0);
        this.router.navigate(['/shop/order']);
      } else {
        alert("Order has not been submitted");
      }
    });

  }

  // Payment Gateway Integration
  payNow(OrderData: any) {
      
    const getProduct = localStorage.getItem('products') !=='undefined' ? JSON.parse(localStorage.getItem('products')!):null;
    const getUserDetail = localStorage.getItem('tempData') !=='undefined' ? JSON.parse(localStorage.getItem('tempData')!):null;
    let orderItems: any = [];
    let newTotalPrice = 0;
    for (let pId of getProduct) {
      newTotalPrice = newTotalPrice + pId.salePrice * pId.quantity;
      orderItems = orderItems.concat([{ quantity: pId.quantity, product: pId._id }]);
    }
    OrderData.totalPrice = this.amountConvert(newTotalPrice);
    OrderData.orderItems = orderItems;
    OrderData.user = getUserDetail.id;
    const RazorOptions = {
      discription: "Ecommerce Application",
      currency: "USD",
      amount:OrderData.totalPrice,
      name: "Ravi Technical",
      key: 'rzp_test_IKMCYQgD15hHoP',
      orderId: "order_Lzp47ByQrH0LJz",
      handler: (response:any) => {
        this.wraperLoader.style.display="block";
        const orderId = response.razorpay_order_id;
        const paymentId = response.razorpay_payment_id;
        const signature = response.razorpay_signature;
        if (paymentId && paymentId !== null && paymentId !== undefined) {
          OrderData.totalPrice = newTotalPrice;
           
          this.dataSource.genericOrderSubmit(OrderData).subscribe((res) => {
            if (res && res != null) {
              localStorage.removeItem('products');
              this.dataSource.cartItem.next(0);
              this.router.navigate(['/shop/order']);
            } else {
              alert("Order has not been submitted");
            }
          });
        }
      },

      prefill: {
        name: "Ravi Technical",
        email: "ravis3682@gmail.com",
        phone: 8127599046
      },
      theme: {
        color: "Navy"
      },
      model: {
        ondismiss: () => {
          console.log("dismissed");
        }
      },

    } // END options here
    let rzap1 = new Razorpay(RazorOptions);
    // On Payment Failed handler
    rzap1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.orderId);
      alert(response.error.metadata.paymentId);
    });
    rzap1.open();
  }

  // convert money into paisa
  amountConvert(num:number){
    let actualAmount = num * 100/1;
    return actualAmount;
}
  // Order place enable & disable 
  ngAfterViewInit():void {
    if(this.placeOrder !== undefined){
      this.placeOrder.nativeElement.disabled = true;
    }
    let cod:any = document.getElementById("cod");
    let online:any = document.getElementById("online");
    cod?.addEventListener('click', (event) => {
      this.placeOrder.nativeElement.style.display="block";
      this.onlinePayment.nativeElement.disabled = true;
      this.placeOrder.nativeElement.disabled = false;
    });

    online?.addEventListener('click', (event) => {
      this.onlinePayment.nativeElement.disabled = false;
      this.placeOrder.nativeElement.disabled = true;
    });
    
    if ( localStorage.getItem('userName')) {
      this.placeOrder ? this.placeOrder.nativeElement.disabled = false : null;
      // this.router.navigate(['/shop/order']);
    }

    if (localStorage.getItem('userName') && this.onlinePayment !==undefined) {
      this.onlinePayment.nativeElement.disabled = false;
    }

  }

   

}  // END CLASS HERE
