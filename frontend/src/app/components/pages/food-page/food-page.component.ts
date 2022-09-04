import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodServiceTsService } from 'src/app/services/food.service.ts.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
food!:Food;
  constructor(activatedRoute:ActivatedRoute,foodservice:FoodServiceTsService,
    private cartService:CartService,private router : Router) {
    activatedRoute.params.subscribe((params)=>{
    if(params.id){
      this.food=foodservice.getFoodById(params.id)
    }
    })
   }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');

  }

}
