import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/Models/Customer';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-accout-detail',
  templateUrl: './accout-detail.component.html',
  styleUrls: ['./accout-detail.component.css']
})
export class AccoutDetailComponent implements OnInit {
 customerId:number=parseInt(sessionStorage.getItem('UserCustomerId')!);
 currentCustomer:Customer=new Customer();
  constructor(private _service:ServiceModuleService, private router:Router) { }

  ngOnInit(): void {
    this._service.GetAccountDetails(this.customerId).subscribe(data=>
      {
        this.currentCustomer=data;
      })
  }

  deleteCookie(){
    sessionStorage.clear();
    this.router.navigateByUrl("/userlogin");
   }

}
