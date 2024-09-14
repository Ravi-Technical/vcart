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
    if(email){
     let submitBtn:any = document.getElementById('submitBtn');
     submitBtn.innerText = "Loading...";
     this.dataSource.genericSellerForgetPassword(email).subscribe((res:any)=>{
       if(res.success==true){
          alert("Reset password link has been sent on your email address");
          this.forgetPassword.reset();
          submitBtn.innerText = "Submit";
        } else if(res.success == false) {
            console.log("User not found");
            submitBtn.innerText = "Submit";
        }
      });
    }
   }

} // END CLASS HERE

