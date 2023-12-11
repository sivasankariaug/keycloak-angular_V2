import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://192.168.1.85:8081'; // Replace with your API endpoint

  private productListUpdateSource = new Subject<void>();
  productListUpdate$ = this.productListUpdateSource.asObservable();

  updateProductList(): void {
    this.productListUpdateSource.next();
  }

  constructor(private http: HttpClient) { }

  getAllProductData(accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/api/product/v1/view`, { headers });
  }
  addProduct(accessToken: string, productDetails): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/api/product/v1/create`, productDetails, { headers });
  }



}
