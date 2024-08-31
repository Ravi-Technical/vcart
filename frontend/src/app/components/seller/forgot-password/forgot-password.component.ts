import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgetPassword:FormGroup = new FormGroup({});

  constructor(private dataSource:SellerService, private fb:FormBuilder){
     this.forgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
     })
  }
  
  ngOnInit(): void {
    
  } // END onInIt();

  forgetForm (email:string){
    let submitBtn:any = document.getElementById('submitBtn');
    submitBtn.innerText = "Loading...";
   this.dataSource.genericSellerForgetPassword(email).subscribe(res=>{
    if(res && res !==null && res !==undefined){
       alert("Reset password link has been sent on your email address");
       this.forgetPassword.reset();
     } else {
       alert("Invalid email address");
     }
   }, (err)=>{
     throw new Error();
   });

  }


} // END CLASS HERE

