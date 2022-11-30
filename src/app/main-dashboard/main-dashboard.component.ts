import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModuleService } from '../service-module.service';
import { UserAccountDetail } from 'src/Models/UserAccountDetail'
@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
 accountId:number=parseInt(sessionStorage.getItem('UserAccountNumber')!);
 currentUser:UserAccountDetail = new UserAccountDetail();
  
  constructor(private _service:ServiceModuleService,private router:Router) { }
  ngOnInit(): void {
   this._service.GetAccountById(this.accountId).subscribe(async data=>{
       this.currentUser=data;
       sessionStorage.setItem('UserCustomerId',JSON.stringify(this.currentUser.customerId));
   })
  }

  deleteCookie(){
    sessionStorage.clear();
    this.router.navigateByUrl("/userlogin");
   }
  
}
