import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { UserScreenComponent } from './components/user-screen/user-screen.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersComponent } from './components/users/users.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'user', component: UserScreenComponent },
  { path: 'admin', component: AdminScreenComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'productslist', component: ProductlistComponent },
  { path: 'userslist', component: UsersComponent },
  { path: '', component: HomeComponent },
  // Other routes...
  // Other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
