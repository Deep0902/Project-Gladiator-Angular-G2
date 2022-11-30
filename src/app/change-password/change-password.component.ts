import { Component, OnInit } from '@angular/core';
import { LogIn } from 'src/Models/LogIn';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 accountId:number;
 OTP:number=12345;
 password:string;
 repassword:string;
 newPass:LogIn = new LogIn();
 flag:boolean=false;
  constructor(private service:ServiceModuleService) { }

  ngOnInit(): void {
  }
  
  updateLoginPassword(){
    if(this.password!=this.repassword)
    alert("Your password does not match")
    else{

    let logId:number;
      console.log('reached updateLoginpassword method '+this.accountId)
      console.log('flag '+ this.flag);
      this.service.GetLogIn().subscribe(data=>{
        for(let obj of data){
          if(this.accountId==obj.accountId)
          {
            this.flag=true;
            this.newPass= {
              logId:obj.logId,
              accountId:this.accountId,
              logInPassword:this.password,
              transactionPassword:obj.transactionPassword
              
            };
            console.log(this.newPass);
            
            this.service.PutUserLogIn(this.newPass).subscribe();
          }
        }
      })
      if(this.flag==true)
      {
        alert('Password changed successfully!')
      }
    }
  }


}
