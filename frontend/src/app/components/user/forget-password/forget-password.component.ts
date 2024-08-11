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
    this.dataSource.genericForgotPassword(email).subscribe((res:any)=>{
       if(res){
        alert("Password reset link has been sent successfully on your email address");
        this.forgetPassword.reset();
       }
    },
    (error)=>{
      alert("Invalid credential please try again!..");
    }
  )
  }

}
