import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { UserScreenComponent } from './components/user-screen/user-screen.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import { KeycloakLoginComponent } from './components/keycloak-login/keycloak-login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: environment.realm,
        clientId: environment.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        flow: 'standard', // Change this to 'standard'
      },
    });
}

@NgModule({
  declarations: [AppComponent, ProductsComponent, HeaderComponent, UserScreenComponent,
    AdminScreenComponent, KeycloakLoginComponent, AddUserComponent, UsersComponent, ProductlistComponent, UserAvatarComponent, AddProductComponent],
  imports: [BrowserModule, AppRoutingModule, KeycloakAngularModule, ReactiveFormsModule, HttpClientModule, NgxPaginationModule, ToastrModule.forRoot(), BrowserAnimationsModule, FormsModule, SearchPipe],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
