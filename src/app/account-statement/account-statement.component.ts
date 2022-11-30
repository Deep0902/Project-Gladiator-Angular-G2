import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/Models/Transaction';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  accStatement:Transaction[]=[];
  accountId:number=parseInt(sessionStorage.getItem('UserAccountNumber')!);
  constructor(private _AccStatementService:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
    this._AccStatementService.getAccStatement(this.accountId).subscribe(AccState=>
      this.accStatement=AccState);
  }

  deleteCookie(){
    sessionStorage.clear();
    this.route.navigateByUrl("/userlogin");
   }
  

}
