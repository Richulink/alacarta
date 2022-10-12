import { getLocaleCurrencyCode } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ComplexSearch } from 'src/app/interfaces/complex-search';
import { Cart } from 'src/app/Model/cart';

import { CartHandleService } from 'src/app/services/cart-handle.service';
import { HandleLocalStorageService } from 'src/app/services/handle-local-storage.service';

import { MenuServiceService } from 'src/app/services/menu-service.service';


@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.css']
})
export class ListfoodComponent implements OnInit {
  items: any [] = [];
  localItems: string;

  

  averagePrice:number;
 
  isLoading: boolean = false;

  healtscore: number;

  

  complexSearch:ComplexSearch;

  @Input() targetCart: any;
  selectedItem: ComplexSearch;
  itema: any[]=[];


  cartObj:  Cart;



  //
  title: string;
  totalItems: number;
  information: any[];

  
  cartArray: any[] = [];
  data = Object.values(this.cartArray)
  isCartEmpty: boolean;
  
  constructor( private service: MenuServiceService, 
    private carthandler: CartHandleService,
    private  handleLocalStorageService : HandleLocalStorageService
    
    ) {
      this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
      }
      

     
  ngOnInit(): void {
console.log ( )
    }
    showAll(){
      
        this.service.getURL().subscribe((res:ComplexSearch)=>{
          
          this.items = res.results[0].analyzedInstructions;
       
          console.log( this.items= res.results
            ,"elementos");
          
          }) 
    
    }

     addItem(item: any) {
      item.total = 0+1; 
      this.carthandler.addOrUpdate(item);    
    }

    //metodos para acumular datos 
    async enviar(item){
       const id = item.id;
      console.log(id);
  
    }


    
   


    onRemove(item: any) {
      item.total -= 1;
      this.carthandler.removeItem(item);
      
  
      // if not items in cart
      // set isCartEmpty to true
      this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
      if(this.cartObj == null) {
        this.isCartEmpty = true;
      }
    }


   
    }
  

 
/*
   intemInfo(_item: ComplexSearch) { 
      this.selectedItem = Object.assign({},_item)
      console.log(this.selectedItem, "este es el item")
    }
    
  }
async fetchItems() {
    try {
      this.isLoading = true;

      this.starters = await this.itemDataService.getItemsCategoryWise(
        'starters'
      );
      this.mains = await this.itemDataService.getItemsCategoryWise('mains');
      this.alcoholicBeverages = await this.itemDataService.getItemsCategoryWise(
        'alcoholic-beverages'
      );
      this.desserts = await this.itemDataService.getItemsCategoryWise(
        'desserts'
      );

      this.isLoading = false;
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  }
*/



   /*
         this.service.getURLById(this.id).subscribe((res:Information)=>{
          console.log(res.healthScore)
          
         })

*/

        
    
      
     /*

this.service.getURL().subscribe((res:ComplexSearch)=>{
        this.items = res.results;
        this._items = res.results;

         console.log(res); 

      })  






     this.service.getURL().subscribe((res)=>{
      console.log(res); 
   }) */


    /*
    enviar(item){
      const id = item.id;
      console.log(id);
  
    }
*/




/*

try {
      this.service.getRecipes().subscribe((res:ReqResponse)=>{
        // console.log( res.searchResults[0].results); 
         this.items = res.searchResults[0].results;
        })  
        this.service.getURL().subscribe((res)=>{
          console.log(res); 
       }) 
    }catch (error) {
      }
  console.log(console.error());
  
    }
*/