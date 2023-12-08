import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private keycloakService: KeycloakService, private router: Router, private auth: AuthServiceService, private userService: UserService) { }
  public role = '';

  ngOnInit(): void {
    this.redirectBasedOnRoles();
  }

  redirectBasedOnRoles(): void {
    // Check if the user is authenticated
    if (this.keycloakService.isLoggedIn()) {
      // Get the token
      console.log('iuhwud');

      const token = this.keycloakService.getKeycloakInstance().tokenParsed;
      const unparsedToken = this.keycloakService.getKeycloakInstance().token;
      console.log('User : ', token['preferred_username']);
      console.log('User Access Token: ', unparsedToken);
      localStorage.setItem('token', unparsedToken);
      const preferredUsername = token['preferred_username'];
      this.userService.setUserName(preferredUsername);
      if (unparsedToken) {
        this.auth.setToken(unparsedToken);
      } else {
        console.error('Access token is undefined.');
      }
      // Example: Redirect based on a specific role
      if (token!.realm_access?.roles?.includes('realm_admin')) {
        this.router.navigate(['admin'], { replaceUrl: true });
        console.log('Redirecting to admin screen');
        this.role = 'realm_admin';
        this.auth.setRole('realm_admin');
      } else if (
        token!.realm_access?.roles?.includes('realm_user')
      ) {
        this.auth.setRole('realm_user');
        this.router.navigate(['user'], { replaceUrl: true });
        console.log('Redirecting to user screen');
        this.role = 'realm_user';
      } else {
        this.router.navigate(['products'], { replaceUrl: true });
        console.log('Redirecting to product screen');
      }

    }
  }
}
