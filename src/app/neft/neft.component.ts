import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from 'src/Models/LogIn';
import { Transaction } from 'src/Models/Transaction';
import { UserAccountDetail } from 'src/Models/UserAccountDetail';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-neft',
  templateUrl: './neft.component.html',
  styleUrls: ['./neft.component.css']
})
export class NeftComponent implements OnInit {
  newNEFTTransaction: Transaction = new Transaction();
  fetchedTransactionPwd: any;
  userDetails: UserAccountDetail = new UserAccountDetail();
  payeeDetails: UserAccountDetail = new UserAccountDetail();
  userBalance: any;
  payeeBalance: any;
  constructor(private _NEFTService: ServiceModuleService, private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(form: any) {
    this.newNEFTTransaction = form.value;
    this.newNEFTTransaction.transactionMode = "NEFT";
    this.newNEFTTransaction.transactionType = "Debit";
    sessionStorage.setItem("Mode", this.newNEFTTransaction.transactionMode);
    sessionStorage.setItem("PaidTo", JSON.stringify(this.newNEFTTransaction.beneficiaryAccount));
    sessionStorage.setItem("Amount", JSON.stringify(this.newNEFTTransaction.amount));
    sessionStorage.setItem("FromAcc", JSON.stringify(this.newNEFTTransaction.accountId));
    sessionStorage.setItem("Remarks", this.newNEFTTransaction.remarks);
    this._NEFTService.getTransactionPwd(form.value.logId).subscribe(data => {
      this.fetchedTransactionPwd = data.transactionPassword;
    });
    console.log(this.fetchedTransactionPwd)
    //Retrive User Details
    this._NEFTService.GetAccountById(this.newNEFTTransaction.accountId).subscribe(data =>
      this.userDetails = data);
    this.userBalance = this.userDetails.balance;
    //Retrive Payee Details
    this._NEFTService.GetAccountById(this.newNEFTTransaction.beneficiaryAccount).subscribe(data =>
      this.payeeDetails = data);
    this.payeeBalance = this.payeeDetails.balance;
    //match the transaction password
    if (this.fetchedTransactionPwd == form.value.transactionPassword) {
      console.log("Pwd matched");
      //Check whether the amount to be transferred is less than or equal to balance
      if (this.newNEFTTransaction.amount <= this.userBalance) {

        //if above condition is satisfied debit amount from user account
        this.userDetails.balance = this.userBalance - this.newNEFTTransaction.amount;
        this._NEFTService.transferAmount(this.newNEFTTransaction.accountId, this.userDetails).subscribe(userdata =>
          console.log(userdata));

        //Add debit transaction
        this._NEFTService.addTransaction(this.newNEFTTransaction).subscribe(data =>
          console.log(this.newNEFTTransaction));
        //Update Payee balance
        this.payeeDetails.balance = this.payeeDetails.balance + this.newNEFTTransaction.amount;
        this._NEFTService.transferAmount(this.newNEFTTransaction.beneficiaryAccount, this.payeeDetails).subscribe(payeedata =>
          console.log(payeedata));
        //Add credit transaction
        this.newNEFTTransaction.transactionType = "Credit";
        var temp = this.newNEFTTransaction.accountId;
        this.newNEFTTransaction.accountId = this.newNEFTTransaction.beneficiaryAccount;
        this.newNEFTTransaction.beneficiaryAccount = temp;
        this._NEFTService.addTransaction(this.newNEFTTransaction).subscribe(data =>
          console.log(this.newNEFTTransaction));
        this.router.navigateByUrl('/transferSuccessful');
      }
      else if (this.userBalance == undefined) {
      }
      else {
        alert("Insufficient Balance!!");
      }
    }
    else if (this.fetchedTransactionPwd == undefined || this.userBalance == undefined || this.payeeBalance == undefined) {
    }
    else {
      alert("Please Enter Valid Transaction Password");
    }

  }

  deleteCookie() {
    sessionStorage.clear();
    this.router.navigateByUrl("/userlogin");
  }


}
