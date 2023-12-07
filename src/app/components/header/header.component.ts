import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Location } from '@angular/common';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private readonly keycloakService: KeycloakService, private router: Router, private location: Location, public auth: AuthServiceService) { }
  public role = '';
  ngOnInit(): void {
    this.role = this.auth.getRole();
    console.log(this.role);
  }
  logout(): void {
    console.log('logout clicked!!!');
    this.router.navigate(['/products'], { replaceUrl: true }).then(() => {
      // Clear Keycloak session information
      this.auth.removeRole();
      location.reload(); // Reload the page
      localStorage.clear();
      this.keycloakService.logout()
      this.location.go('/products'); // Navigate to the root
      this.keycloakService.clearToken();
    });
  }


}
