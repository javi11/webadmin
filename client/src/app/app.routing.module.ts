import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import helloRoute from './hello/hello.route';
import goodbyeRoute from './goodbye/goodbye.route';

const appRoutes: Routes = [
  helloRoute,
  goodbyeRoute,
  {
    path: '',
    redirectTo: '/hello',
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
