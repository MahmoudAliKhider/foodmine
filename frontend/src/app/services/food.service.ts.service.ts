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
  getAllFoodBySearchTerm(searchTerm:string){
   return this.getAll().filter(food=> food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  getFoodById(foodId:string):Food{
  return this.getAll().find(food => food.id == foodId)?? new Food(); 
  }
}
