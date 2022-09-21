import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDER_CREATE_URL } from '../shared/constants/url';
import { Order } from '../shared/models/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL,order)
  }
}
