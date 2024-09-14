import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  
  forgetPassword!:FormGroup;

  fb = inject(FormBuilder);

  constructor(private dataSource:ProductService){}

  ngOnInit(): void {
      this.forgetPassword = new FormGroup({
        email: new FormControl('')
      })
  }

  forgetForm(email: string){
    this.validateEmail(email);
    let submit:any = document.querySelector('#submit');
    submit.innerHTML = "Loading...";
    this.dataSource.genericForgotPassword(email).subscribe((res:any)=>{
      if(res) {
        if(res.success  !== true){
          alert("User not found, please enter correct email address")
          submit.innerHTML = "Submit";
        } else {
          alert("Password reset link has been sent successfully on your email address");
          this.forgetPassword.reset();
          submit.innerHTML = "Submit";
        }
       }
       
    }
  )
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){
       return alert("PLeas ener valid email")
    }
  }


}
