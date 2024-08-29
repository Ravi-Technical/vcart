import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/@core/seller.service';
import { Seller, SellerLogin } from '../../models/product.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRegister!:boolean;

  message:any;
  
  constructor(private dataSource:SellerService, private router:Router){}

ngOnInit(): void {
  if(localStorage.getItem('sellerToken')){
     this.router.navigate(['/seller/dashboard']);
  }
}

// Login Form
loginSubmit(login:SellerLogin){
  this.dataSource.sellerLogin(login).subscribe((res:any)=>{
    if(res.success !== false){
      localStorage.setItem("name", res.name);
      localStorage.setItem("sellerToken", res.token);
      this.dataSource.isSellerLoggedIn.next(res.name);
      this.router.navigate(['/seller/dashboard']);
    } else if(res.success == false){
      alert("Invalid Credentail");
    }
  })
}

// Register Form
regsiterSubmit(register:any){
   if(register.valid && register.form.controls.email.valid){
    this.dataSource.registerSeller(register).subscribe(res=>{
      if(res && res !==null && res !== undefined){
         this.router.navigate(['/seller/dashboard']);
      }else {
        alert("Something went wrong!...");
      }
    });
   }

  

}

// Login & Register Form Hide Show
hideShow(){
  this.loginRegister = !this.loginRegister;
}

// Password Hide Show 
passwordHideShow(event:any){
 const password = (<HTMLInputElement>document.getElementById('password'));
 if(password.type=='password') {
  password.type = 'text';
  event.target.className = "fa fa-eye";
 } else {
  password.type = 'password';
  event.target.className = "fa fa-eye-slash";
 }

}

validateEmail(event) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(event.target.value)){
    return true
  } else {
    alert("Please enter a valid email address");
  }
}



}
