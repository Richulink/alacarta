import { Component, OnInit } from '@angular/core';
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


  constructor( private service: MenuServiceService,
    private handleLocalStorage: HandleLocalStorageService
    
    ) 
  {
    this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
      // here data is cart data object
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
  async ngOnInit(): Promise<void> {

    console.log( await this.service.complexS.results[0]+"la variable desde el servicio")

    
  }
*/
}
