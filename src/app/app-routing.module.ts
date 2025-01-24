import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path:'', component:WelcomeComponent },
  { path:'login',component:LoginComponent },
  { path:'register',component:RegisterComponent },
  { path:'dashboard',component:DashboardComponent },
  { path:'task',component:TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
