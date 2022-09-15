import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORE_MESSAGE:any = {

    required:'Should not be empty',
    email:'Email is not valid',
    minlength: 'Field is too short',
    notMatch: 'Password and Confirm does not match'
  
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
@Input()
  controle!:AbstractControl
@Input()
showErrorsWhen:boolean =true;
errorMessages:string[]=[]
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.cheackValidation()
  }

  ngOnInit(): void {
    this.controle.statusChanges.subscribe(()=>{
      this.cheackValidation()
    })
    this.controle.valueChanges.subscribe(()=>{
      this.cheackValidation()
    })

  }
  cheackValidation(){
    const error = this.controle.errors
    if(!error){
      this.errorMessages=[]
      return;
    }

    const errorKeys= Object.keys(error)
    this.errorMessages=errorKeys.map(key=> VALIDATORE_MESSAGE[key])
  }


}
