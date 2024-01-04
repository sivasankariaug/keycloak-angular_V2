import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public a = baseUrl.ip;
  private apiUrl = 'http://' + baseUrl.ip + ':' + baseUrl.port; // Replace with your API endpoint

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
