import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payee } from 'src/Models/Payee';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-payee-list',
  templateUrl: './payee-list.component.html',
  styleUrls: ['./payee-list.component.css']
})
export class PayeeListComponent implements OnInit {
 payees:Payee[]=[];
 accountId:number=parseInt(sessionStorage.getItem('UserAccountNumber')!)
  constructor(private _service:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
    this._service.GetPayeeListbyAccountId(this.accountId).subscribe(data=>{
      this.payees.push(data);
      },(err)=>{alert("Please Add Payee first");
    });
    
  }
  deleteCookie(){
    sessionStorage.clear();
    this.route.navigateByUrl("/userlogin");
   }
  
}
