import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sampl_foods, sampl_tag } from 'src/data';
import { FOOD_BY_SEARCH_URL, FOOD_BY_TAG_URL, FOOD_TAGS_URL, FOOD_URL,FOOD_BY_ID_URL } from '../shared/constants/url';

import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceTsService {

  constructor(private http:HttpClient) { }

  getAll():Observable <Food[]>{
    return this.http.get<Food[]>(FOOD_URL);
  }
  getAllFoodBySearchTerm(searchTerm:string){
   return this.http.get<Food[]>(FOOD_BY_SEARCH_URL+searchTerm)
  }
  getAllTags():Observable <Tag[]>{
 return this.http.get<Tag[]>(FOOD_TAGS_URL);
  }
  getAllFoodByTag(tag:string):Observable<Food[]>{
    return tag==='All'?
    this.getAll():
    this.http.get<Food[]>(FOOD_BY_TAG_URL+tag)
  }
  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
