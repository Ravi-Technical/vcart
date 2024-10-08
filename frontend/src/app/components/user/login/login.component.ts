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
  emailValidate:string = "";
  test :any = [];
  isSubmit!:boolean;

  constructor(private dataSource:ProductService, private router:Router){
    // Reguster User FormGroup
    this.userReg = new FormGroup({
      name : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      mobile : new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
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

  verifyEmail(even){
    if(this.userReg.controls['email'].valid){
      let email = even.target.value;
      this.findEmail(email);
    } else {
      alert("Please enter valid email");
      this.userReg.controls['email'].reset();
    }
    
  }
 
  // Login Register Form Toggle
   loginRegisterToggle(){
    this.loginRegister = !this.loginRegister;
   }
  // Login Form
  userLogin(loginData:userLoginModel){
    let submitBtn:any = document.querySelector('#submit');
    submitBtn.innerHTML = "Loading...";
   this.dataSource.genericUserLogin(loginData).subscribe((res:any)=>{
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
  userRegister(){
    let rSubmit:any = document.querySelector("#rSubmit");
    rSubmit.innerHTML = "Loading...";
    if(this.userReg.valid){
      this.dataSource.genericUserRegister(this.userReg.value).subscribe((res:any)=>{
        if(res && res.success == true){
          alert("User Registred Successfully");
          this.loginRegister = true;
          this.userReg.reset();
        } 
      });
    }else {
      alert("Input data are not correct");
    }

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
   let allUser:any = []; 
   this.dataSource.allAuthorizedUser().subscribe((res)=>{
     if(res !==null && res !==undefined){
        allUser = res;
        let getUser = allUser.find((u)=>{
           return u.email == email;
        });
        if(getUser){
            alert("Email already in used, please enter new email address");
            this.userReg.controls['email'].reset();
        } 
     }
   })
 } 
 
 // Goto Forgot Password
 goToForgotPassword(){
  this.router.navigate(['/user/forget-password'])
 }



} // END WRAPER CLASS HERE
