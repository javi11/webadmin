import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import dashboardRoute from './dashboard/dashboard.route';
import loginRoute from './login/login.route';

const appRoutes: Routes = [
  loginRoute,
  dashboardRoute,
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
