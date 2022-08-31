import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm =''
  constructor( activateRoute:ActivatedRoute,private route:Router) {
  activateRoute.params.subscribe((params=>{
    if(params.searchTerm) this.searchTerm=params.searchTerm;
  }))
  }

  ngOnInit(): void {
  }
  search(term:string):void{
 if(term){
  this.route.navigateByUrl('/search/'+term)
 }
  }

}
