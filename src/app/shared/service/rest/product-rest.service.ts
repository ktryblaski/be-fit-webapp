import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {

  private readonly API_URL = '/api/products';

  constructor(private http: HttpClient) {}

  getOne(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${productId}`);
  }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  save(product: Product): Observable<number> {
    return this.http.post<number>(this.API_URL, product);
  }

}
