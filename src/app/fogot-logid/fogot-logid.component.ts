import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-fogot-logid',
  templateUrl: './fogot-logid.component.html',
  styleUrls: ['./fogot-logid.component.css']
})
export class FogotLogidComponent implements OnInit {
  accountId:number;
  OTP:number=12345;
  constructor(private service:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
  }

  GetLogId(){
   this.service.GetLogInByAccountID(this.accountId).subscribe(data=>{
    
    alert("Your Log Id is "+data.logId);
      
     },(err)=>{
      alert("You are not registered.");
      this.route.navigateByUrl("/register");
    }
   );
     
    
     }  
    }
 
   
