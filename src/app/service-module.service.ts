import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CreateUserAccount } from 'src/Models/CreateUserAccount';
import { Customer } from 'src/Models/Customer';
import { LogIn } from 'src/Models/LogIn';
import { Payee } from 'src/Models/Payee';
import { Transaction } from 'src/Models/Transaction';
import { UserAccountDetail } from 'src/Models/UserAccountDetail';

@Injectable({
  providedIn: 'root'
})
export class ServiceModuleService {
  httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
    url:string="https://localhost:44393/api";
  constructor(private http:HttpClient) { }
 //Get data from Customers table
  GetCreateNewAccount():Observable<any> 
  {
    return this.http.get<any>((this.url)+"/customer");
  }
//Get data from Customers table w.r.t. id
  GetAccountDetails(id:any):Observable<any>{
    return this.http.get<any>((this.url)+"/customer/"+id);
  }

//Add data to Customers table
  
PostCreateNewAccount(newCustomer:Customer):Observable<any>
{
  return this.http.post<any>(((this.url) +"/customer"),newCustomer);
}

 //Get data from UserAccountDetails table
GetAccount():Observable<any>{
  return this.http.get<any>((this.url)+"/useraccountdetail");
}

//Get data from UserAccountDetails table w.r.t. id
GetAccountById(id:any):Observable<any>{
  return this.http.get<any>((this.url)+"/useraccountdetail/"+id);
}

GetAccountByCustomerId(id:any):Observable<any>{
  return this.http.get<any>((this.url)+"/useraccountdetail/customerid/"+id);
}

//Add data to UserAccountDetails table
PostAccount(newAccount:CreateUserAccount):Observable<any>{
  return this.http.post<any>(((this.url) +"/useraccountdetail"),newAccount)
}

//Get data from userlogin
GetLogIn():Observable<any>{
  return this.http.get<any>((this.url)+"/userlogin");
}

GetLogInByAccountID(id:any):Observable<any>{
  return this.http.get<any>((this.url)+"/userlogin/accountid/"+id);
}

//Update data in userlogin
PutUserLogIn(val:LogIn):Observable<any>{
  return this.http.put<any>((this.url)+"/userlogin/"+val.logId,val);
}

//Add newUser in userlogin
PostUserLogIn(newUser:LogIn):Observable<any>{
  return this.http.post<any>(((this.url)+"/userlogin"),newUser);
}
  

ApproveCustomer(id:any):Observable<any>{
  return this.http.patch<any>((this.url)+"/customer/approval/"+id,id);
}

RejectCustomer(id:any):Observable<any>{
  return this.http.patch<any>((this.url)+"/customer/reject/"+id,id);
}

DeactivateAccount(id:any):Observable<any>{
  return this.http.patch<any>((this.url)+"/useraccountdetail/reject/"+id,id);
}

ActivateAccount(id:any):Observable<any>{
  return this.http.patch<any>((this.url)+"/useraccountdetail/approval/"+id,id);
}

getAccStatement(AccId:number):Observable<any>
{
  return this.http.get<any>((this.url)+"/TransactionDetail/"+AccId);
}

addPayee(payeeData:Payee):Observable<any>{
  return this.http.post<any>((this.url)+"/payeedetail",payeeData);
}

getPayee():Observable<Payee[]>{
  return this.http.get<Payee[]>((this.url)+"/payeedetail");
}

GetPayeeListbyAccountId(id:any):Observable<any>{
  return this.http.get<any>((this.url)+"/payeedetail/accountId/"+id)
}

addTransaction(transactionData:Transaction){
  return this.http.post<any>((this.url)+"/transactiondetail",transactionData);
}

getTransactionPwd(logId:number):Observable<any>{
  return this.http.get<any>((this.url)+"/UserLogin/"+logId);
}

transferAmount(AccId:number,userAccountDetail:UserAccountDetail){
  return this.http.patch<any>((this.url)+"/UserAccountDetail/updatebalance/"+AccId,userAccountDetail);
}

getPendingCustomers():Observable<any>{
  return this.http.get<any>((this.url)+"/customer/pendingcustomers");
}


handleError(error:HttpErrorResponse){
  
  let errorMessage="";

  errorMessage=error.status +'\n'+error.statusText+'\n'+error.error;

  alert(errorMessage);

  return throwError(errorMessage);

}

}
