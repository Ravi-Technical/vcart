import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileForm') profileForm!:NgForm
  
  name: any;email: any;mobile: any;pincode: any;city: any;state: any;alternatePhone: any;address: any;userId: any; password:any;

  element:any;

  getAllDetail:any;

  constructor(private dataSource:ProductService, private el:ElementRef, private router:Router){

     const getUserDetails:any  = JSON.parse(localStorage.getItem('tempData')!);
      this.name = getUserDetails.name,
      this.email = getUserDetails.email,
      this.mobile = getUserDetails.mobile,
      this.pincode = getUserDetails.pincode,
      this.city = getUserDetails.city,
      this.state = getUserDetails.state,
      this.alternatePhone = getUserDetails.alternatePhone,
      this.address = getUserDetails.address;
      this.userId = getUserDetails.id;
      this.password = getUserDetails.password

   }

  ngOnInit(): void {
    
  }

  proForm(profileData:any){
    profileData._id = this.userId;
    this.dataSource.updateCurrentUser(profileData).subscribe(res=>{
      if(res){
        localStorage.setItem('tempData', JSON.stringify(res));
        let uName = JSON.parse(localStorage.getItem('tempData')!).name
        this.dataSource.isUserLoggedIn.next(uName);
        localStorage.setItem('userName', uName);
        this.element.innerHTML = "Submit";
        this.element.disabled = true;
        this.router.navigate(['/user/dashboard']);
      }
    })
 
  }

  // Button Enable
  onChange() {
     this.element = document.getElementById("Submit");
     if(this.element.disabled == true){
      this.element.disabled = false;
      this.element.innerHTML = "Update";
     } else {
      this.element.disabled = true;
      this.element.innerHTML = "Submit";
     }
  }
















} //****************** END CLASS HERE *******************/ 
