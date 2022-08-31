import { Injectable } from '@angular/core';
import { sampl_foods } from 'src/data';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceTsService {

  constructor() { }

  getAll():Food[]{
    return sampl_foods;
  }
}
