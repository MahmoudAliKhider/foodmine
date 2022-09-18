import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
private isLoadingSubjects = new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading(){
    this.isLoadingSubjects.next(true)
  }
  hideLoading(){
    this.isLoadingSubjects.next(false)
  }
  get isLoading(){
   return this.isLoadingSubjects.asObservable()
  }
}
