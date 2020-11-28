import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/domain/product';
import { ProductParams } from '../../../module/product/products-list/-model/product.params';
import { SortOrder } from '../../component/sort/-model/sort-order';
import { PagedDTO } from '../../dto/table/paged.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductRestService {
  private readonly API_URL = '/api/products';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  findAll(params?: ProductParams): Observable<PagedDTO<Product>> {
    const queryParams: { [param: string]: string | string[] } = {};

    if (params?.sort) {
      const order = params.sort.sortOrder === SortOrder.ASC ? '+' : '-';
      queryParams.sort = `${order}${params.sort.sortBy}`;
    }

    if (params?.pagination?.page && params?.pagination?.pageSize) {
      queryParams.page = String(params.pagination.page - 1);
      queryParams.pageSize = String(params.pagination.pageSize);
    }

    return this.http.get<PagedDTO<Product>>(this.API_URL, { params: queryParams });
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
