import { Component, OnInit } from '@angular/core';
import { FoodServiceTsService } from 'src/app/services/food.service.ts.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
foods:Food[]=[];
  constructor(private foodservice:FoodServiceTsService) {
    this.foods=foodservice.getAll();
  }

  ngOnInit(): void {
  }

}
