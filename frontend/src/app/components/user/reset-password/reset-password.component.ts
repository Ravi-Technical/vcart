import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmedValidator} from '../reset-password/confirmValidator'
import { ProductService } from 'src/app/@core/product.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  resetForm:FormGroup = new FormGroup({}); 
  userToken;
  errorFlag:boolean = false;
  eyeClass = "fa fa-eye-slash";eyeClass1 = "fa fa-eye-slash";
   
 

  constructor( private activatedRoute:ActivatedRoute, private fb:FormBuilder, private productService:ProductService, private router:Router){
     
     // Make & Validate Form Field
     this.resetForm = this.fb.group({
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]]
     }, 
     {validator: this.passwordValidatior}
   );
   
   

  }

  ngOnInit(): void {
     // Get Active Route 
      this.activatedRoute.params.subscribe(val=>{
        this.userToken = val['token'];
     })
     

  } // END ngOnInIt();

  passwordValidatior(form:AbstractControl){ 
  return form.get('password')?.value === form.get('confirmPassword')?.value ? null : {mismatch:true}
  }

  // get form access controls
  
  get f(){
    return this.resetForm.controls; 
  }

  // Reset Form
  resetPasswordForm(formData:any){
   const userObj = {
    token: this.userToken,
    password : formData.password
   }
    this.productService.genericResetPassword(userObj).subscribe(res=>{
      if(res && res !==null && res !== undefined){
          alert("Your password has been successfully reset")
          this.router.navigate(['/user/login']);
      }
    })
  }

  // Hide & Show Password
  eyeChange(){
    let password:any = (document.getElementById('password') as HTMLElement);
    if(password.type === 'password'){
      this.eyeClass = "fa fa-eye";
      password.type = 'text';
    }else {
      password.type = 'password';
      this.eyeClass = "fa fa-eye-slash";
    }
  }

   // Hide & Show Password
   eyeChange1(){
    let password:any = (document.getElementById('confirmPassword') as HTMLElement);
    if(password.type === 'password'){
      this.eyeClass1 = "fa fa-eye";
      password.type = 'text';
    }else {
      password.type = 'password';
      this.eyeClass1 = "fa fa-eye-slash";
    }
  }


}
