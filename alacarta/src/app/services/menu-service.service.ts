import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComplexSearch } from '../interfaces/complex-search';



@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(
    private http: HttpClient) { }
  
    public menuSelected: any = { id: "" }

    apiKey: string = "fa36eb54158a4dbe801dbe5d9c5581b5";
  
     //apiKey2    "9862d781ebf54bd6abff8539e5c68df8"
   

url2: string = "https://api.spoonacular.com/recipes/findByNutrients?apiKey="+this.apiKey+"&maxCarbs=50&number=2"

url3: string = "https://api.spoonacular.com/recipes/complexSearch";
urlBy: string = "https://api.spoonacular.com/recipes/";

 
getURL(): Observable<any> {
    return this.http.get(this.url3+"?apiKey="+this.apiKey+"&number=10&addRecipeInformation=true")
  }

getURLById(id:any): Observable<any> {
  return this.http.get(this.urlBy+id+"/analyzedInstructions?apiKey="+this.apiKey)
}

getUrlByingredient(ingredient: any): Observable<any> {
return this.http.get(this.urlBy+"/findByIngredients?apiKey="+this.apiKey+ingredient+"&number=2")
}

}
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2

// https://api.spoonacular.com/recipes/{id}/analyzedInstructions

/*
"https://api.spoonacular.com/recipes/716429/information?apiKey=9862d781ebf54bd6abff8539e5c68df8includeNutrition=false"
https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
*/