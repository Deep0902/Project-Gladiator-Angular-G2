import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { UserLogInComponent } from './user-log-in/user-log-in.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AccoutDetailComponent } from './accout-detail/accout-detail.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FogotLogidComponent } from './fogot-logid/fogot-logid.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { NeftComponent } from './neft/neft.component';
import { RtgsComponent } from './rtgs/rtgs.component';
import { ImpsComponent } from './imps/imps.component';
import { AddNewPayeeComponent } from './add-new-payee/add-new-payee.component';
import { TransferSuccessfulComponent } from './transfer-successful/transfer-successful.component';
import { PayeeListComponent } from './payee-list/payee-list.component';
import { ContactusComponent } from './contactus/contactus.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userlogin',component:UserLogInComponent},
  {path:"forgetPassword",component:ForgotPasswordComponent},
{path:"changePassword",component:ChangePasswordComponent},
{path:"createAccount",component:CreateAccountComponent},
{path:"register",component:RegisterUserComponent},
{path:"maindashboard",component:MainDashboardComponent},
{path:"accountdetail",component:AccoutDetailComponent},
{path:"adminPanel",component:AdminPanelComponent},
{path:"forgetLogId",component:FogotLogidComponent},
{path:"accountStatement",component:AccountStatementComponent},
{path:"neft",component:NeftComponent},
{path:"rtgs",component:RtgsComponent},
{path:"imps",component:ImpsComponent},
{path:"addPayee",component:AddNewPayeeComponent},
{path:"transferSuccessful",component:TransferSuccessfulComponent},
{path:"payeeList",component:PayeeListComponent},
{path:"contactus", component:ContactusComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
