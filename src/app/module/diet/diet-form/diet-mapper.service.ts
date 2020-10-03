import { Injectable } from '@angular/core';
import {DietFormHandler} from './diet-form-handler';
import {DietDTO} from '../../../shared/model/domain/diet';

@Injectable({
  providedIn: 'root'
})
export class DietMapperService {

  map(formHandler: DietFormHandler): DietDTO {
    // TODO
    return null;
  }

}
