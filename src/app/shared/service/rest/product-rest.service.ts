import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/domain/product";
import {map} from "rxjs/operators";
import {ApiResponse, mapResponse} from "../../model/domain/response";

@Injectable({
  providedIn: "root"
})
export class ProductRestService {

  private readonly API_URL = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.API_URL)
      .pipe(map(mapResponse));
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.API_URL}/${productId}`)
      .pipe(map(mapResponse));
  }

  saveProduct(product: Product): Observable<number> {
    return this.http.post<ApiResponse<number>>(this.API_URL, product)
      .pipe(map(mapResponse));
  }

}
