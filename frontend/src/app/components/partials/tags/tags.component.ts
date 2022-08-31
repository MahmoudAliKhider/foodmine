import { Component, OnInit } from '@angular/core';
import { FoodServiceTsService } from 'src/app/services/food.service.ts.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
 tags?:Tag[];
  constructor(foodservice:FoodServiceTsService) {
  this.tags= foodservice.getAllTags();
  }

  ngOnInit(): void {
  }

}
