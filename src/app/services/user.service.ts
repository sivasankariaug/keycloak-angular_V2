import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  private usernameSubject = new Subject<string>();
  username$ = this.usernameSubject.asObservable();

  setUserName(username: string): void {
    localStorage.setItem('preferred_username', username);
    this.usernameSubject.next(username);
    console.log('setted:', localStorage.getItem('preferred_username'));

  }

  addUser(userDetails: any, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/api/v1/user/create`, userDetails, { headers });
  }

  getAllUserData(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/api/v1/user/view/all`, { headers });
  }
}
