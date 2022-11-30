import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/Models/Customer';
import { ServiceModuleService } from '../service-module.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
 newAccount:Customer = new Customer();
  constructor(private _service:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(myForm:any){
   this.newAccount=myForm.value;
   this._service.PostCreateNewAccount(myForm.value).subscribe(data=>
    {
      console.log(myForm.value);
    });
  alert("Form Submitted Successfully")
  this.route.navigateByUrl("/userlogin");
  }
}
