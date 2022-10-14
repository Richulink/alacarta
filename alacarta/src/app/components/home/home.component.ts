import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Model/cart';
import { CartHandleService } from 'src/app/services/cart-handle.service';
import { HandleLocalStorageService } from 'src/app/services/handle-local-storage.service';
import { MenuServiceService } from 'src/app/services/menu-service.service';
import { ListfoodComponent } from '../listfood/listfood.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCartEmpty: boolean ;
  totalAmt: number;
  totalItems: number;
  goToOrders: boolean = false;
  hideCartBar: boolean = false;
  itemsdata: Cart;
  cartArray: any [] =[];


  constructor( private service: MenuServiceService,
    private handleLocalStorage: HandleLocalStorageService,
   private cartHandleService : CartHandleService
    
    ) 
    {
      this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
  
        this.itemsdata = data
  
       
       
  
        if (this.itemsdata != null && this.itemsdata.items != undefined) {
          console.log(this.itemsdata, "estado de la variable")
         
          this.cartArray = []; //lo vacia para que no se repita

          const itemD = this.itemsdata.items
        for (let item in itemD) {
         
  
          const itemObj = itemD[item];
  
          const obj = {
            title: itemObj.title,
            healthScore: itemObj.healthScore,
            vegan: itemObj.vegan,
            pricePerServing: itemObj.pricePerServing,
  
          };
          this.cartArray.push(obj);
          this.isCartEmpty = true;
         
        }  
      } else {
        //this.isCartEmpty = true;
      }
        if (data != null && Object.keys(data.items).length > 0) {
         
         
  
          this.totalAmt = data.totalAmt;
          this.totalItems = Object.keys(data.items).length; 
        }
        else if(this.itemsdata == null){
          
          this.isCartEmpty = this.cartHandleService.isEmptyCart;
          console.log("el booleano del home",this.isCartEmpty)


        }
       
        
       
      });
     }

searchCart(event: string): void{
console.log("desde el home",event);
}


  ngOnInit(): void {
 
  }
  clearCart() {
   
    this.handleLocalStorage.removeCartData();
  }


  
/*


      if (this.itemsdata != null && this.itemsdata.items != undefined) {
        this.isCartEmpty = false;
        const itemD = this.itemsdata.items;

        for (let item in itemD) {
          const itemObj = itemD[item];

          const obj = {

            title: itemObj.title,
            healthScore: itemObj.healthScore,
            vegan: itemObj.vegan,
            pricePerServing: itemObj.pricePerServing,

          };
          this.cartArray.push(obj);
        }
      }
    });





*/








/*
  async ngOnInit(): Promise<void> {

    console.log( await this.service.complexS.results[0]+"la variable desde el servicio")

    
  }
*/
}
