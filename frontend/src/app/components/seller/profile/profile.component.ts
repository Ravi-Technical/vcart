import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  sellerProfile:any;
  
  name:any;email:any;mobile:any;address:any;password:any;

  sellerForm:FormGroup = new FormGroup({});

  eyeChange = "fa fa-eye-slash";

 constructor(private dataSource:SellerService, private fb:FormBuilder, private router:Router){

    this.sellerForm = this.fb.group({
        name : ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        mobile : ['', [Validators.required]],
        address : ['', [Validators.required]],
        password : ['', [Validators.required]]
    });

    this.dataSource.sellerProfile().subscribe((res:any)=>{
      this.sellerProfile = res ? res : "";
      this.name = this.sellerProfile.name;
      this.email = this.sellerProfile.email;
      this.password = this.sellerProfile.password;
      this.mobile = this.sellerProfile.mobile;
      this.address = this.sellerProfile.address; 
    });

 }
  
 ngOnInit(): void {
 

 } // END ngOnInIt() HERE


// Enable update form
updateForm(){
  let submit:any = document.getElementById("submit");
  if(submit.disabled = true){
    submit.disabled = false;
    submit.innerHTML = "Update";
  } else {
    submit.disabled = true;
    submit.innerHTML = "Submit";
  }
} 

// Seller Form Update
 sellerProfileForm(sellerProfile:any){
    this.dataSource.genericSellerUpdate(sellerProfile).subscribe(res=>{
        if(res && res !==null && res !== undefined){
           alert("Profile has been updated successfully");
           this.router.navigate(['seller/dashboard']);
        }
    }, (err)=>{
      alert("Something went wrong!..");
    });
 }

 eyeChanges() {
  let password:any = document.getElementById('password');
  if(password.type == "password"){
    password.type = "text";
    this.eyeChange = "fa fa-eye";
  }else {
    password.type = "password";
    this.eyeChange = "fa fa-eye-slash";
  }
  
 }











} // END CLASS HERE
