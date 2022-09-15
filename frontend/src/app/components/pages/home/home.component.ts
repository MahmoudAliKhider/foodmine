import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodServiceTsService } from 'src/app/services/food.service.ts.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
foods:Food[] =[];
  constructor(private foodservice:FoodServiceTsService,activateRoute:ActivatedRoute) {
let foodObservable : Observable<Food[]>

    activateRoute.params.subscribe((params)=>{
      if(params.searchTerm){
        this.foodservice.getAllFoodBySearchTerm(params.searchTerm).subscribe(searchServer=>{
          this.foods=searchServer;
        })
      }else if(params.tag){
        this.foodservice.getAllFoodByTag(params.tag).subscribe(tagserver=>{
          this.foods=tagserver
        })
      }
      else{
        //foodObservable=this.foodservice.getAll();

        this.foodservice.getAll().subscribe((serverFood)=>{
          this.foods=serverFood
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
