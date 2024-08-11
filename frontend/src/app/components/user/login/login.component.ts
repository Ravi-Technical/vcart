import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ProductService } from 'src/app/@core/product.service';
import { userLoginModel } from '../../models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginRegister:boolean = false;
  userReg!:FormGroup;
  uLogin!:FormGroup;
  emailValidate:string = ""
  test :any = [];
  constructor(private dataSource:ProductService, private router:Router){
    // Reguster User FormGroup
    this.userReg = new FormGroup({
      name : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      mobile : new FormControl("", [Validators.required, Validators.max(12)]),
      address : new FormControl("", [Validators.required]),
      pincode : new FormControl("", [Validators.required]),
      city : new FormControl("", [Validators.required]),
      state : new FormControl("", [Validators.required]),
      alternatePhone : new FormControl("", [Validators.required]),
    });
    // User Login
    this.uLogin = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    })
  } // END CONSTRUCTOR 

  ngOnInit(): void {
   const getUser = localStorage.getItem('userToken');
   if(getUser && getUser !==null){
    this.router.navigate(['/user/dashboard']);
   } 
  }
 
  // Login Register Form Toggle
   loginRegisterToggle(){
    this.loginRegister = !this.loginRegister;
   }
  // Login Form
  userLogin(loginData:userLoginModel){
   this.dataSource.genericUserLogin(loginData).subscribe((res:any)=>{
    console.log(res)
    if(res.success !== false){
      this.dataSource.isUserLoggedIn.next(res[0]);
      localStorage.setItem('userName', res[0]);
      localStorage.setItem('userToken', res[1]);
      localStorage.setItem('tempData', JSON.stringify(res[2]))
      this.router.navigate(['/']);
    }
    else if(res.success == false){
      alert("Invalid Credentail");
    }

   })
  }
  // Register Form
  userRegister(userRegister:FormGroup){
    this.dataSource.genericUserRegister(userRegister.value).subscribe((res)=>{
      if(res){
        alert("User Registred Successfully");
        this.loginRegister = true;
        userRegister.reset();
      } 
    })
  }
  // Password Type Change
  eyeChange(event:any){
    const password = (<HTMLInputElement>document.getElementById("password"));
    if(password.type=='password'){
       password.type = "text";
       event.target.className = "fa fa-eye"
    }else {
       password.type = "password";
       event.target.className = "fa fa-eye-slash"
    }
  }
 
 // Check Email Address Exists OR Not
 findEmail(email:string){
   this.dataSource.allAuthorizedUser().subscribe((res)=>{
     
   })
 } 
 
 // Goto Forgot Password
 goToForgotPassword(){
  this.router.navigate(['/user/forget-password'])
 }



} // END WRAPER CLASS HERE
