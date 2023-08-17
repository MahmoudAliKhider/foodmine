import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shared/models/cartitem';
import { Cart } from '../shared/models/Carts';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartTolocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}
  addToCart(food: Food) {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.setCartTolocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartTolocalStorage();
  }
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartTolocalStorage();
  }
  clearCaer() {
    this.cart = new Cart();
    this.setCartTolocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }
  private setCartTolocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );

    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
  }

  private getCartTolocalStorage(): Cart {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
