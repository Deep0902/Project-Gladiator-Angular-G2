import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from 'src/Models/LogIn';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  OTP:number=12345;
  newUser:LogIn = new LogIn();
  constructor(private _service:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:any){
    this.newUser=myForm.value;
    this._service.PostUserLogIn(myForm.value).subscribe(data=>
     {
       console.log(myForm.value);
     });
   alert("Form Submitted successfully")
   this.route.navigateByUrl("/userlogin");
   }


}
