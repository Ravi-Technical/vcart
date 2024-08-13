import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/@core/product.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userName!:string | null;

  constructor(private dataSource:ProductService, private router:Router){}

  ngOnInit(): void {
         
        if(localStorage.getItem('userName')){
            this.userName = localStorage.getItem('userName');
        }
  }

  // LogOut 
  logOut(){
     localStorage.removeItem('userName');
     localStorage.removeItem('tempData');
     localStorage.removeItem('userToken');
     this.dataSource.isUserLoggedIn.next("");
     this.dataSource.userLogOut.next(false);
     this.router.navigate(['/']);
  }

}
