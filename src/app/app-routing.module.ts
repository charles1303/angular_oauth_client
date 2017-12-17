import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';
import { CallbackComponent } from './component/callback.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component'; 
import { CanActivateGuard } from './auth/can-activate.guard';
import { UserComponent } from './user/user.component'; 

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'requests',
    component: RequestDetailsComponent,
    canActivate: [
      AuthGuard
    ]
  },

  { 
    path: 'users',     
    component: UserComponent, 
    canActivate: [CanActivateGuard] 
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'callback',
    component: CallbackComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
