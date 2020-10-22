import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { AuthGuard} from './auth.guard';
import { CustomerGuard } from './customer.guard';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m=>m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/customer/customer.module').then(m=>m.CustomerModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
