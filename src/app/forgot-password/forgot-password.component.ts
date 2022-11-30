import { Component, OnInit } from '@angular/core';
import { ServiceModuleService } from '../service-module.service';
import { LogIn } from 'src/Models/LogIn';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  accountId:number;
  OTP:number=12345;
  password:string;
  rePassword:string;
  transaction:string;
  retransaction:string;
  flag:boolean=false;
  newpass:LogIn = new LogIn();

  constructor(private service:ServiceModuleService,private router:Router) { }

  ngOnInit(): void {
  }
  
  updateLoginPassword(){

    if(this.password!=this.rePassword){
      alert("Your password does not match");
    }
   else if (this.transaction!=this.retransaction){
      alert("Your transaction password does not match");
    }
  else{
    let logId:number;
      console.log('reached updateLoginpassword method '+this.accountId)
      console.log('flag '+ this.flag);
      this.service.GetLogIn().subscribe(data=>{
        for(let obj of data){
          if(this.accountId==obj.accountId)
          {
            this.flag=true;
            this.newpass= {
              logId:obj.logId,
              accountId:this.accountId,
              logInPassword:this.password,
              transactionPassword:this.transaction
              
            };
            console.log(this.newpass);
            
            this.service.PutUserLogIn(this.newpass).subscribe();
          }
       
        }
        if(this.flag==true)
        {
          alert('Password changed successfully!')
        }
      
      })
      
      this.router.navigateByUrl('');
    }
  }

}
