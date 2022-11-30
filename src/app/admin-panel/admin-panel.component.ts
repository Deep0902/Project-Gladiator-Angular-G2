import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModuleService } from '../service-module.service';
import { Customer } from 'src/Models/Customer';
import { CreateUserAccount } from 'src/Models/CreateUserAccount';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
 customerList:Customer[]=[];
 date:Date=new Date();
 newUser:CreateUserAccount;
 
  constructor(private service:ServiceModuleService,private route:Router,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.service.getPendingCustomers().subscribe(data=>{
        this.customerList=data;
        console.log(this.customerList);
    })
    
  }
  
  Approval(customerId:any){
    this.service.ApproveCustomer(customerId).subscribe();
    alert("Customer is approved");
   
    this.newUser={
       customerId:Number(customerId),
       accountStatus:true,
       accOpDate:(this.datepipe.transform(this.date,'yyyy-MM-ddTHH:mm:ss')!),
       balance:10000,
     }
    console.log(this.newUser);
    this.service.PostAccount(this.newUser).subscribe(data=>{
      console.log(data);
    })
  }

  Reject(customerId:any){
    this.service.RejectCustomer(customerId).subscribe();
    alert("Customer is rejected");
  }

  deleteCookie(){
    sessionStorage.clear();
    this.route.navigateByUrl("/userlogin");
   }
}
