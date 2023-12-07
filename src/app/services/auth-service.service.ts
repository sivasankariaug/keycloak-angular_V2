import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {



  private tokenKey: any;
  private role: any;

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setRole(role: string): void {
    localStorage.setItem(this.role, role);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.role);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  removeRole(): void {
    localStorage.removeItem(this.role);
  }


}
