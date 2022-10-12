import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComplexSearch } from '../interfaces/complex-search';
import { Cart } from '../Model/cart';
import { ItemDetails } from '../Model/item-details';
import { HandleLocalStorageService } from './handle-local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CartHandleService implements OnInit{
  healtscoreItem: Cart;
  cartObj: Cart;
  itemsArray: ItemDetails[] = [];
  itemDetails: ItemDetails;
  constructor(private handleLocalStorageService: HandleLocalStorageService) {
    
   }


   private dataItem$ = new BehaviorSubject<ComplexSearch>(null);
   


   public selectedItem: ComplexSearch;


  ngOnInit(): void {
    this.cartObj = this.getCartData();
  }

  get selecteDataItem():Observable<ComplexSearch>{
return this.dataItem$.asObservable();
  }
  setDataItem(data: ComplexSearch):void{
    this.dataItem$.next(data);
  }






  getCartData() {
    if (this.handleLocalStorageService.getCartData() != null) {
      return JSON.parse(this.handleLocalStorageService.getCartData());
    }

    return null;
  }



   /** add or update items in cart */
   addOrUpdate(item: any) {
    // trae el objeto desde el local storage
    this.cartObj = this.getCartData();

    // se agrega la cart primera vez
    if (this.cartObj == null) {
      
      const cart: Cart = {
        items: {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            total: item.total ,
            itemId: item.id,
            category: item.category,
            title: item.title,
            pricePerServing: item.pricePerServing,
            imageUrl: item.imageUrl,
            cookingMinutes: item.cookingMinutes,
            vegan: item.vegan,
            fulldishes: item.fulldishes,//cantidad de platos
            healthScore: item.healthScore 
          },
        },
        healtscoreItem: item.healthScore,
        totalAmt: item.pricePerServing,//cambiado por price
      };

      this.handleLocalStorageService.addCartData(cart);
    } else {
      // add a new item to cart
      if (this.cartObj.items[item.id] == undefined) {
        const itemD: ItemDetails = {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            total: item.total,
            itemId: item.id,
            category: item.category,
            title: item. title,
            pricePerServing:  item.pricePerServing,
            imageUrl: item.imageUrl,
            cookingMinutes: item.cookingMinutes,
            vegan: item.vegan,
            fulldishes: item.fulldishes,//cantidad de platos
            healthScore: item.healthScore 
          },
          
        };

        // any better way?
        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.id]: itemD[item.id],
          },
          healtscoreItem : this.getAverage(item.healthScore, true),
         
          totalAmt: this.getCartTotalAmount(item.pricePerServing, true),
        };

        this.handleLocalStorageService.addCartData(this.cartObj);
      } else {
        
        const itemD = this.cartObj.items[item.id];
        itemD.total += 1;
        this.cartObj.items[item.id] = itemD;

        this.cartObj.healtscoreItem = this.getAverage(item.healthScore, true), ///// healtScore 
        this.cartObj.totalAmt = this.getCartTotalAmount(item.pricePerServing, true);

        this.handleLocalStorageService.addCartData(this.cartObj);
      }
    }
  }


  removeItem(item: any) {
    this.cartObj = this.getCartData();

    if (this.cartObj.items != null) {
      const itemD = this.cartObj.items[item.id]; 
 
      if (itemD.total > 1) { 
        itemD.total -= 1; 
        this.cartObj.items[item.id] = itemD;

      } else if (itemD.total == 1) { 
        delete this.cartObj.items[item.id];
      }

     this.cartObj.healtscoreItem = this.getAverage(item.healthScore, true),
      this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false); // como es falso solo resta el precio al totalAmt     
    }

    this.handleLocalStorageService.addCartData(this.cartObj);
  }


getAverage(healthScore: number, add: boolean): number{

  let amt: number;

  if (add == true) { //le puse false de prueba
    amt = 2 / Number(this.cartObj.healtscoreItem) + Number(healthScore);
  } else {
    amt = 2 / Number(this.cartObj.healtscoreItem) - Number(healthScore);
  }

  return amt;


}



getCartTotalAmount(pricePerServing: number, add: boolean): number {
    let amt: number;

    if (add == true) { //le puse false de prueba
      amt = Number(this.cartObj.totalAmt) + Number(pricePerServing);
    } else {
      amt = Number(this.cartObj.totalAmt) - Number(pricePerServing);
    }

    return amt;
  }


  
}
