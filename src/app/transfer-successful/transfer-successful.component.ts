import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transfer-successful',
  templateUrl: './transfer-successful.component.html',
  styleUrls: ['./transfer-successful.component.css']
})
export class TransferSuccessfulComponent implements OnInit {
  transactmode:string|null;
paidTo:string|null;
amount:string|null;
fromAcc:string|null;
remarks:string|null;
date:Date;
  constructor(private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
this.transactmode=sessionStorage.getItem("Mode");
this.paidTo=sessionStorage.getItem("PaidTo");
this.amount=sessionStorage.getItem("Amount");
this.fromAcc=sessionStorage.getItem("FromAcc");
this.remarks=sessionStorage.getItem("Remarks");
this.date=new Date();

  }
  deleteCookie(){
    sessionStorage.clear();
    this.route.navigateByUrl("/userlogin");
   }
  

}
