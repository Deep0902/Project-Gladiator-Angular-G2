import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payee } from 'src/Models/Payee';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-add-new-payee',
  templateUrl: './add-new-payee.component.html',
  styleUrls: ['./add-new-payee.component.css']
})
export class AddNewPayeeComponent implements OnInit {
   
  newPayee:Payee = new Payee();
  constructor(private _service:ServiceModuleService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this.newPayee=form.value;
    this._service.addPayee(this.newPayee).subscribe();
    alert("Payee added successfully");
    this.route.navigateByUrl("/maindashboard");
  }

  deleteCookie(){
    sessionStorage.clear();
    this.route.navigateByUrl("/userlogin");
   }
  
}
