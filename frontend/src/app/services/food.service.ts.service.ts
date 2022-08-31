import { Injectable } from '@angular/core';
import { sampl_foods, sampl_tag } from 'src/data';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

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
  getAllTags():Tag[]{
 return sampl_tag;
  }
  getAllFoodByTag(tag:string):Food[]{
    return tag==='All'?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }
  getFoodById(foodId:string):Food{
  return this.getAll().find(food => food.id == foodId)?? new Food();
  }
}
