
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
  responseIngredient: any[] = [];
  ingredient: "";
  complexSearch: ComplexSearch;
  @Input() targetCart: any;
  selectedItem: ComplexSearch;
  cartObj: Cart;

  public isCartEmpty: boolean;

  @Output() newItemEvent = new EventEmitter<string>();


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


  }
////
  pastas(){
    this.service.getURLIntolerance().subscribe((res: any) => {

      this.items = res.results

      

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
   removeItem(item: any) {
    item.total = 0 - 1;
    this.carthandler.removeItem(item);
  
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
    if (this.cartObj == null) { 
      this.isCartEmpty = this.isCartEmpty = true
      console.log("ahora esta vacio")
    }
   }
  onInput(item: string): void{
      this.newItemEvent.emit(item);
  }
  
}



