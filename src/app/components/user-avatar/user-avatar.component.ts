import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  public userName: string = '';
  showPopup: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private keycloakService: KeycloakService,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.username$.subscribe((username) => {
      this.userName = username || 'null';
      console.log('this.userName', this.userName);
    });
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  logout(): void {
    console.log('logout clicked!!!');
    this.router.navigate(['/products'], { replaceUrl: true }).then(() => {
      // Clear Keycloak session information
      this.auth.removeRole();
      localStorage.clear();
      this.keycloakService.logout();
      this.keycloakService.clearToken();
      this.location.go('/products'); // Navigate to the root
      location.reload(); // Reload the page after clearing Keycloak session
    });
  }


  goToManageUser(): void {
    // Implement the logic for navigating to manage user page
  }
}