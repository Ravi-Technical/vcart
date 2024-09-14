import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm:FormGroup = new FormGroup({});

  eyeClass = "fa fa-eye-slash"; eyeClass1 = "fa fa-eye-slash";

  token!:string;

  constructor(private dataSource:SellerService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute){
     this.resetForm = this.fb.group({
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]]
     }, {
      validator : this.compairePassword
     })
  }

  ngOnInit(): void {
      this.route.params.subscribe(res=>{
        this.token = res['token'];
      })

  } // END onInIt()

  compairePassword(form:AbstractControl){
  return form.get('password')?.value === form.get('confirmPassword')?.value? null : {misMatch:true}
  }

  // Reset Password 
  resetPasswordForm(formData:any){
    let submit:any = document.querySelector('#submit');
    submit.innerHTML = "Loading...";
        let collection = {
          token:this.token,
          password:formData.password
        } 
        this.dataSource.genericSellerResetPassword(collection).subscribe(res=>{
         if(res && res !==null && res !==undefined){
          alert("Password has been changed successfully");
          submit.innerHTML = "Submit";
          this.router.navigate(['/seller/login']);
         } else {
          alert("Reset password link has been expired please try again")
          submit.innerHTML = "Submit";
         }
        });
  }
  

  // Get Form Field
  get f(){
    return this.resetForm.controls
  }

 // Password Hide & Show 1
 passwordToggle() {
  let password:any = (document.getElementById('password') as HTMLElement);
  if(password.type === 'password'){
    this.eyeClass = "fa fa-eye";
    password.type = 'text';
  }else {
    password.type = 'password';
    this.eyeClass = "fa fa-eye-slash";
  }
 }

  // Password Hide & Show 2
  passwordToggle1() {
    let confirmPassword:any = (document.getElementById('confirmPassword') as HTMLElement);
    if(confirmPassword.type === 'password'){
      this.eyeClass1 = "fa fa-eye";
      confirmPassword.type = 'text';
    }else {
      confirmPassword.type = 'password';
      this.eyeClass1 = "fa fa-eye-slash";
    }
   }


} // END CLASS HERE 
