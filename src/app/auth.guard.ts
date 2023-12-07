// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private keycloak: KeycloakService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const authenticated = this.keycloak.isLoggedIn();

        if (!authenticated) {
            // Redirect to Keycloak login page
            this.router.navigate(['/keycloak-login'], { replaceUrl: true });
            return false;
        }

        return true;
    }
}
