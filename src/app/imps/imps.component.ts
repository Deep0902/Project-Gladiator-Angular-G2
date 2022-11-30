import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from 'src/Models/LogIn';
import { Transaction } from 'src/Models/Transaction';
import { UserAccountDetail } from 'src/Models/UserAccountDetail';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {
  newIMPSTransaction:Transaction = new Transaction();
  fetchedTransactionPwd:LogIn = new LogIn();
  userDetails:UserAccountDetail = new UserAccountDetail();
  payeeDetails:UserAccountDetail = new UserAccountDetail();
  userBalance:any;
  payeeBalance:any;
  constructor(private _RTGSService:ServiceModuleService,private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(form:any){
  this.newIMPSTransaction=form.value;
  this.newIMPSTransaction.transactionMode="RTGS";
  this.newIMPSTransaction.transactionType="Debit";
  sessionStorage.setItem("Mode",this.newIMPSTransaction.transactionMode);
  sessionStorage.setItem("PaidTo",JSON.stringify(this.newIMPSTransaction.beneficiaryAccount));
  sessionStorage.setItem("Amount",JSON.stringify(this.newIMPSTransaction.amount));
  sessionStorage.setItem("FromAcc",JSON.stringify(this.newIMPSTransaction.accountId));
  sessionStorage.setItem("Remarks",this.newIMPSTransaction.remarks);
  this._RTGSService.getTransactionPwd(form.value.logId).subscribe(data=>{
  this.fetchedTransactionPwd=data.transactionPassword;
  });
  console.log(this.fetchedTransactionPwd)
  //Retrive User Details
  this._RTGSService.GetAccountById(this.newIMPSTransaction.accountId).subscribe(data=>
  this.userDetails=data);
  this.userBalance=this.userDetails.balance;
  //Retrive Payee Details
  this._RTGSService.GetAccountById(this.newIMPSTransaction.beneficiaryAccount).subscribe(data=>
  this.payeeDetails=data);
  this.payeeBalance=this.payeeDetails.balance;
  //match the transaction password
  if(this.fetchedTransactionPwd==form.value.transactionPassword){
  console.log("Pwd matched");
  //Check whether the amount to be transferred is less than or equal to balance
  if(this.newIMPSTransaction.amount<=this.userBalance){
   
  //if above condition is satisfied debit amount from user account
  this.userDetails.balance=this.userBalance-this.newIMPSTransaction.amount;
  this._RTGSService.transferAmount(this.newIMPSTransaction.accountId,this.userDetails).subscribe(userdata=>
  console.log(userdata));
   
  //Add debit transaction
  this._RTGSService.addTransaction(this.newIMPSTransaction).subscribe(data=>
  console.log(this.newIMPSTransaction));
  //Update Payee balance
  this.payeeDetails.balance=this.payeeDetails.balance+this.newIMPSTransaction.amount;
  this._RTGSService.transferAmount(this.newIMPSTransaction.beneficiaryAccount,this.payeeDetails).subscribe(payeedata=>
  console.log(payeedata));
  //Add credit transaction
  this.newIMPSTransaction.transactionType="Credit";
  var temp= this.newIMPSTransaction.accountId;
  this.newIMPSTransaction.accountId=this.newIMPSTransaction.beneficiaryAccount;
  this.newIMPSTransaction.beneficiaryAccount=temp;
  this._RTGSService.addTransaction(this.newIMPSTransaction).subscribe(data=>
  console.log(this.newIMPSTransaction));
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
