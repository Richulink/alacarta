
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { ComplexSearch } from 'src/app/interfaces/complex-search';
import { Cart } from 'src/app/Model/cart';


import { CartHandleService } from 'src/app/services/cart-handle.service';
import { HandleLocalStorageService } from 'src/app/services/handle-local-storage.service';

import { MenuServiceService } from 'src/app/services/menu-service.service';


@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.css'],
 // providers:[PipeFilter]
})
export class ListfoodComponent implements OnInit {
  items: any[] = [];
  localItems: string;
  responseIngredient: any[] = [];
  ingredient: "";

  averagePrice: number;

  isLoading: boolean = false;

  healtscore: number;



  complexSearch: ComplexSearch;

  @Input() targetCart: any;
  selectedItem: ComplexSearch;
  itema: any[] = [];


  cartObj: Cart;



  //
  title: string;  
  totalItems: number;



  cartArray: any[] = [];
  //data: any [] = [];
 

  isEmpty: boolean = false;


  public isCartEmpty: boolean; // bander de que esta bacio


  constructor(private service: MenuServiceService,
    private carthandler: CartHandleService,
    private handleLocalStorageService: HandleLocalStorageService

  ) {
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
     
  }
  
  ngOnInit(): void {
   
   
  }

  showAll() {

    this.service.getURL().subscribe((res: ComplexSearch) => {

      this.items = res.results[0].analyzedInstructions;

      console.log(this.items = res.results
        , "elementos");

    })
  }
  ///

  valor: string;
  onSubmit(f){

   // console.log(f.value);  // { first: '', last: '' }
    //console.log(f.valid);  // false
    

  //this.service.getUrlByingredient()

  }
////
  sinGluten(){
    this.service.getURLIntolerance().subscribe((res: any) => {

      this.items = res.results

      console.log(this.items = res.results
        , "sin gluten");

    })
  }

  ///
  searchByIndredient(ingredient: any) {
    this.service.getUrlByingredient((res: ComplexSearch) => {

      this.responseIngredient = res.results
    })
  }
///
  addItem(item: any) {
    item.total = 0 + 1;
    this.carthandler.addOrUpdate(item);
  }

 ///

   removeItem(item: any) {
    item.total = 0 - 1;
    this.carthandler.removeItem(item);
  
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
    if (this.cartObj == null) { //si no hay item devuelve true
      this.isCartEmpty = this.isCartEmpty = true
      console.log("ahora esta vacio")
     
      // this.isEmpty = true;
    }
  }

  @Output() newItemEvent = new EventEmitter<string>();

  onInput(item: string): void{
     // console.log("el item",item)
      this.newItemEvent.emit(item);
  }


 
}



