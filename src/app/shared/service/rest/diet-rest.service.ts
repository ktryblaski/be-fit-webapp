import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Diet, DietDTO, DietView} from "../../model/domain/diet";
import {ApiResponse, mapResponse} from "../../model/domain/response";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DietRestService {

  private readonly API_URL = '/api/diets';

  constructor(private http: HttpClient) {}

  getDietsLite(): Observable<DietView[]> {
    return this.http.get<ApiResponse<DietView[]>>(`${this.API_URL}/lite`)
      .pipe(map(mapResponse));
  }

  getDiet(dietId: number): Observable<Diet> {
    return this.http.get<ApiResponse<Diet>>(`${this.API_URL}/${dietId}`)
      .pipe(map(mapResponse));
  }

  create(diet: DietDTO): Observable<number> {
    return this.http.post<ApiResponse<number>>(`${this.API_URL}`, diet)
      .pipe(map(mapResponse));
  }

  update(diet: DietDTO, dietId: number): Observable<Diet> {
    diet.id = dietId;
    return this.http.put<ApiResponse<Diet>>(`${this.API_URL}/${diet.id}`, diet)
      .pipe(map(mapResponse));
  }

}
