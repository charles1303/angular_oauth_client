import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { CallbackComponent } from './component/callback.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateGuard } from './auth/can-activate.guard';
import {ErrorLogService} from './service/error-log.service';
import {GlobalErrorHandlerService} from './service/global-error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    RequestDetailsComponent,
    CallbackComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, AuthenticationService, CanActivateGuard, ErrorLogService, GlobalErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
