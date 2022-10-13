import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Model/cart';
import { HandleLocalStorageService } from 'src/app/services/handle-local-storage.service';
import { MenuServiceService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCartEmpty: boolean = true;
  totalAmt: number;
  totalItems: number;
  goToOrders: boolean = false;
  hideCartBar: boolean = false;
  itemsdata: Cart;
  cartArray: any [] =[];


  constructor( private service: MenuServiceService,
    private handleLocalStorage: HandleLocalStorageService
    
    ) 
    {
      this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
  
        this.itemsdata = data
  
        const itemD = this.itemsdata.items
       
  
        if (this.itemsdata != null && this.itemsdata.items != undefined) {
          this.cartArray = []; //lo vacia para que no se repita
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
        if (data != null && Object.keys(data.items).length > 0) {
          this.isCartEmpty = false;
  
          this.totalAmt = data.totalAmt;
          this.totalItems = Object.keys(data.items).length; 
        }
        if (data == null) {
          this.isCartEmpty = true;
        }
      });
     }




  ngOnInit(): void {
 
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
