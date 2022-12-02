import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModuleService } from '../service-module.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email: string
  password: string

  constructor(private _service: ServiceModuleService, private route: Router) { }

  ngOnInit(): void {
  }

  checkCredentials() {
    if (this.email == "admin" && this.password == "admin") {
      alert("Successful Login")
      this.route.navigateByUrl("/adminPanel");
    }

    else
      alert("Invalid credentials")
  }

}
