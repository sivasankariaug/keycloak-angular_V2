import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-keycloak-login',
  templateUrl: './keycloak-login.component.html',
  styleUrl: './keycloak-login.component.css'
})
export class KeycloakLoginComponent implements OnInit {
  constructor(private keycloak: KeycloakService) { }
  ngOnInit(): void {
    // Redirect to Keycloak login
    this.keycloak.login();
  }
}
