import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/domain/product';

@Injectable({
  providedIn: 'root',
})
export class ProductRestService {
  private readonly API_URL = '/api/products';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  save(product: Product): Observable<number> {
    return this.http.post<number>(this.API_URL, product);
  }

  favourite(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}/favourite`, {});
  }

  unfavourite(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}/unfavourite`, {});
  }
}
