import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
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
  constructor(activatedRoute:ActivatedRoute, private foodservice:FoodServiceTsService,
    private cartService:CartService,private router : Router) {

      let foodObservable : Observable<Food>

    activatedRoute.params.subscribe((params)=>{
    if(params.id){
     this.foodservice.getFoodById(params.id).subscribe(serverFood =>{
         //console.log (this.food=serverFood)
        this.food=serverFood
      })

      // this.foodPage(params.id)
    }
    })
   }

  ngOnInit(): void {

  }

  // foodPage(getId:string){
  // this.foodservice.getFoodById(getId).subscribe((res:any)=>{
  //   this.food=res
  // },Error=>{
  //   console.log(Error)
  // })
  // }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');

  }

}
