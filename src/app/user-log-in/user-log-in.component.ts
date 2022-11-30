import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {

  ngOnInit(): void {
  }
  flag:boolean=false;
  LogId:number; 
  LogInPassword:string;

  constructor(private service:ServiceModuleService,private router: Router) { }
  accountdetails:any = [];
  arr:any = [];

  getCookies(){
    
    this.service.GetLogIn() //validate user credentials
    .subscribe(data=>{
    if(this.LogInPassword.length<5)
    {
      alert('Enter password of minimum length of 5')
    }
    if(this.LogId==1234 && this.LogInPassword=='adminpass')
    { 
      this.flag=true;
      alert('Admin Logged in!!')
      this.router.navigateByUrl('/adminPanel');
    }
    for (let obj of data) 
    {
      if(obj.logId==this.LogId && obj.logInPassword==this.LogInPassword)
      {
        console.log('reached')
        this.flag=true;
        this.service.GetAccount().subscribe(res=> {
        for(let obj1 of res)
        {
          if(obj1.accountId==obj.accountId)
          {
            sessionStorage.setItem('UserAccountNumber',(obj1.accountId));
            console.log(sessionStorage);
          }
        }
        this.router.navigateByUrl('/maindashboard');
    });
 
      }
    }
    if(this.flag==false)
    {
      alert("Invalid login credentials!!")
    }

  });


  }
}
