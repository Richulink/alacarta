import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ComplexSearch } from '../interfaces/complex-search';
import { Cart } from '../Model/cart';
import { ItemDetails } from '../Model/item-details';
import { HandleLocalStorageService } from './handle-local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CartHandleService implements OnInit {

  healtscoreItem: Cart;
  cartObj: Cart;
  //itemsArray: ItemDetails[] = [];
  //itemDetails: ItemDetails;

  
  countDishesVegan: number = 0;
 
  constructor(private handleLocalStorageService: HandleLocalStorageService) {

  }
  public numberofdishes: number;
  public isEmptyCart: boolean;
  public totalFinal :boolean;
  private dataItem$ = new BehaviorSubject<ComplexSearch>(null);
 

  public selectedItem: ComplexSearch;
  ngOnInit(): void {
    this.cartObj = this.getCartData();
    
  }

  get selecteDataItem(): Observable<ComplexSearch> {
    return this.dataItem$.asObservable();
  }
  setDataItem(data: ComplexSearch): void {
    this.dataItem$.next(data);
  }

  getCartData() {
    if (this.handleLocalStorageService.getCartData() != null) {
      return JSON.parse(this.handleLocalStorageService.getCartData());
    }

    return null;
  }

  addOrUpdate(item: any) {
    // trae el objeto desde el local storage
    this.cartObj = this.getCartData();
   
    // se agrega la cart primera vez
    if (this.cartObj == null ) {  
      this.numberofdishes = 0; // reseteado

      const cart: Cart = {
        items: {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            total: item.total,
            itemId: item.id,
            category: item.category,
            title: item.title,
            pricePerServing: item.pricePerServing,
            imageUrl: item.imageUrl,
            cookingMinutes: item.cookingMinutes,
            vegan: item.vegan,
            fulldishes: item.fulldishes,
            healthScore: item.healthScore
          },
        },
        esvegano: item.vegan,
        totalAmt: item.pricePerServing,

      };   
      this.handleLocalStorageService.addCartData(cart);   
    } 
     
    else {
      if (this.cartObj.items[item.id] == undefined && this.numberofdishes <= 3 ) {

        const itemD: ItemDetails = {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            total: item.total,
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
        
        }

        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.id]: itemD[item.id],
           
          },
          //
          esvegano: item.vegan,
          totalAmt: this.getCartTotalAmount(item.pricePerServing, true),
          ///
          

        };

        this.handleLocalStorageService.addCartData(this.cartObj);
        if(this.cartObj.esvegano==true){        
          this.countDishesVegan =+1;
          console.log("es re vegano",this.countDishesVegan)
        }
      }     
      else {

       if(this.numberofdishes <= 3){ // 

        const itemD = this.cartObj.items[item.id];
        itemD.total += 1;
        this.cartObj.items[item.id] = itemD;
        this.handleLocalStorageService.addCartData(this.cartObj);
       } 
        Swal.fire('Ops! ya no puedes agregar mas elementos.',
       'Se debe a que a hay un plato repetido o exede los 4 elementos, intenta de nuevo').then(()=>{
       this.handleLocalStorageService.removeCartData();
      
       }) 
      }
      
    }
  }



  removeItem(item: any) {
    this.cartObj = this.getCartData();

    if (this.cartObj.items != null && this.numberofdishes <= 3) {
      const itemD = this.cartObj.items[item.id];
       if (itemD.total == 1) {
        delete this.cartObj.items[item.id];
      }
        this.cartObj.totalAmt = this.getCartTotalAmount(item.pricePerServing, false); // como es falso solo resta el precio al totalAmt     
    }

    this.handleLocalStorageService.addCartData(this.cartObj);
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
