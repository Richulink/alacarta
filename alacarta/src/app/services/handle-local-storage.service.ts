import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../Model/cart';

@Injectable({
  providedIn: 'root'
})
export class HandleLocalStorageService {
  
  cartDataSub = new BehaviorSubject<Cart>(null);
  
  constructor() { }

  getUser() {
    return localStorage.getItem('token');
  }


   // datos de la carta
   addCartData(cart: Cart) {

    localStorage.setItem('datosDeLcarta', JSON.stringify(cart));

    const obj = JSON.parse(localStorage.getItem('datosDeLcarta'));

    // verificar si los artículos en el carrito están vacíos
    if (Object.keys(obj.items).length == 0) {
      this.removeCartData();
    }

    this.cartDataSub.next(JSON.parse(this.getCartData()));
  }



  
  removeCartData() {
  
    if (localStorage.getItem('datosDeLcarta') != null) {
      localStorage.removeItem('datosDeLcarta');
    }
    this.cartDataSub.next(null);
    
  }

  getCartData() {
    return localStorage.getItem('datosDeLcarta');
  }

  getCartDataObservable() {
    this.cartDataSub.next(JSON.parse(this.getCartData()));
    return this.cartDataSub.asObservable();
  }

  
}
