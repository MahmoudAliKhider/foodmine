import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/url';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import{ToastrService} from 'ngx-toastr';

import { User } from '../shared/models/user';
import { IUserRegister } from '../shared/interfaces/iUserRegister';
 const USER_KEY ='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
private userSubject = new BehaviorSubject<User>(this.getUserFromlocalStorage());
public userObservable:Observable<User>
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

//  فديو 14 الدقيقة 9
  login(userLogin:IUserLogin):Observable<User>{
   return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
    tap({
      next:(user)=>{
        this.setUserToLocalStorage(user)
       this.userSubject.next(user);
       this.toastrService.success(
        `Welcom to Foodmine ${user.name}
        Login Success`
       )
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error,"Login Faild")

      }
    })
   )
  }

register(userRegister:IUserRegister):Observable<User>{

  return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
    tap({
      next:(user)=>{
        this.setUserToLocalStorage(user)
       this.userSubject.next(user);
       this.toastrService.success(
        `Welcom to Foodmine ${user.name}
        Register Success`
       )
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error,"register Faild")

      }
    })
   )
}


  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }


  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  private getUserFromlocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson)as User;
     return new User()
  }
}
