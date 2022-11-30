import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from 'src/Models/LogIn';
import { Transaction } from 'src/Models/Transaction';
import { UserAccountDetail } from 'src/Models/UserAccountDetail';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  newRTGSTransaction:Transaction = new Transaction();
  fetchedTransactionPwd:any;
  userDetails:UserAccountDetail = new UserAccountDetail();
  payeeDetails:UserAccountDetail = new UserAccountDetail();
  userBalance:any;
  payeeBalance:any;
  constructor(private _RTGSService:ServiceModuleService,private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(form:any){
  this.newRTGSTransaction=form.value;
  this.newRTGSTransaction.transactionMode="RTGS";
  this.newRTGSTransaction.transactionType="Debit";
  sessionStorage.setItem("Mode",this.newRTGSTransaction.transactionMode);
  sessionStorage.setItem("PaidTo",JSON.stringify(this.newRTGSTransaction.beneficiaryAccount));
  sessionStorage.setItem("Amount",JSON.stringify(this.newRTGSTransaction.amount));
  sessionStorage.setItem("FromAcc",JSON.stringify(this.newRTGSTransaction.accountId));
  sessionStorage.setItem("Remarks",this.newRTGSTransaction.remarks);
  this._RTGSService.getTransactionPwd(form.value.logId).subscribe(data=>{
  this.fetchedTransactionPwd=data.transactionPassword;
  });
  console.log(this.fetchedTransactionPwd)
  //Retrive User Details
  this._RTGSService.GetAccountById(this.newRTGSTransaction.accountId).subscribe(data=>
  this.userDetails=data);
  this.userBalance=this.userDetails.balance;
  //Retrive Payee Details
  this._RTGSService.GetAccountById(this.newRTGSTransaction.beneficiaryAccount).subscribe(data=>
  this.payeeDetails=data);
  this.payeeBalance=this.payeeDetails.balance;
  //match the transaction password
  if(this.fetchedTransactionPwd==form.value.transactionPassword){
  console.log("Pwd matched");
  //Check whether the amount to be transferred is less than or equal to balance
  if(this.newRTGSTransaction.amount<=this.userBalance){
   
  //if above condition is satisfied debit amount from user account
  this.userDetails.balance=this.userBalance-this.newRTGSTransaction.amount;
  this._RTGSService.transferAmount(this.newRTGSTransaction.accountId,this.userDetails).subscribe(userdata=>
  console.log(userdata));
   
  //Add debit transaction
  this._RTGSService.addTransaction(this.newRTGSTransaction).subscribe(data=>
  console.log(this.newRTGSTransaction));
  //Update Payee balance
  this.payeeDetails.balance=this.payeeDetails.balance+this.newRTGSTransaction.amount;
  this._RTGSService.transferAmount(this.newRTGSTransaction.beneficiaryAccount,this.payeeDetails).subscribe(payeedata=>
  console.log(payeedata));
  //Add credit transaction
  this.newRTGSTransaction.transactionType="Credit";
  var temp= this.newRTGSTransaction.accountId;
  this.newRTGSTransaction.accountId=this.newRTGSTransaction.beneficiaryAccount;
  this.newRTGSTransaction.beneficiaryAccount=temp;
  this._RTGSService.addTransaction(this.newRTGSTransaction).subscribe(data=>
  console.log(this.newRTGSTransaction));
  this.router.navigateByUrl('/transferSuccessful');
  }
  else if(this.userBalance==undefined){
  }
  else{
  alert("Insufficient Balance!!");
  }
  }
  else if(this.fetchedTransactionPwd==undefined || this.userBalance==undefined || this.payeeBalance==undefined){
  }
  else{
  alert("Please Enter Valid Transaction Password");
  }
      }

      deleteCookie(){
        sessionStorage.clear();
        this.router.navigateByUrl("/userlogin");
       }
      

}
