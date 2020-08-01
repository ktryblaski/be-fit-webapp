import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Diet, DietView} from "../../model/domain/diet";

@Injectable({
  providedIn: "root"
})
export class DietRestService {

  private readonly API_URL = '/api/diets';

  constructor(private http: HttpClient) {}

  getDietsLite(): Observable<DietView[]> {
    return this.http.get<DietView[]>(`${this.API_URL}/lite`);
  }

  getDiet(dietId: number): Observable<Diet> {
    return this.http.get<Diet>(`${this.API_URL}/${dietId}`);
  }

}
