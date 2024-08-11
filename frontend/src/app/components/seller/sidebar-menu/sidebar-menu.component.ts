import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/@core/seller.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  sellerName: any;
  constructor(private dataSource:SellerService, private router:Router){
    this.dataSource.isSellerLoggedIn.subscribe(res=>{
      if(res || sessionStorage.getItem('token')){
          this.dataSource.sellerProfile().subscribe(res=>{
            this.sellerName = res[0].name;
          })
      }
    })

  }

  ngOnInit(): void {
    
  }

  // Logout

  logOut(){
    localStorage.removeItem('name');
    localStorage.removeItem('sellerToken');
    this.dataSource.sellerLogOut.next(false);
    this.router.navigate(['/']);
  }


}
