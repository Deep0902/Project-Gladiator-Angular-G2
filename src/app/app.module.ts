import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AccoutDetailComponent } from './accout-detail/accout-detail.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FogotLogidComponent } from './fogot-logid/fogot-logid.component';
import { DatePipe } from '@angular/common';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { AddNewPayeeComponent } from './add-new-payee/add-new-payee.component';
import { ImpsComponent } from './imps/imps.component';
import { NeftComponent } from './neft/neft.component';
import { RtgsComponent } from './rtgs/rtgs.component';
import { TransferSuccessfulComponent } from './transfer-successful/transfer-successful.component';
import { PayeeListComponent } from './payee-list/payee-list.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    CreateAccountComponent,
    UserLogInComponent,
    HomeComponent,
    RegisterUserComponent,
    MainDashboardComponent,
    AccoutDetailComponent,
    AdminPanelComponent,
    FogotLogidComponent,
    AccountStatementComponent,
    AddNewPayeeComponent,
    ImpsComponent,
    NeftComponent,
    RtgsComponent,
    TransferSuccessfulComponent,
    PayeeListComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
