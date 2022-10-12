import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepItem } from 'src/app/Model/step-item';
import { CartHandleService } from 'src/app/services/cart-handle.service';
import { MenuServiceService } from 'src/app/services/menu-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private dataService: CartHandleService, private route: ActivatedRoute, private menuService: MenuServiceService) {
    
   }
  id: string  = this.route.snapshot.paramMap.get('id');
  lista: StepItem [] = [];
  


  ngOnInit(): void {
    
    //console.log(this.route.snapshot.paramMap.get('id'));
    this.menuService.getURLById(this.id).subscribe ( 
      (data)=>{
        this.lista = data;
        console.log(this.lista)
      }
    )
  }
 
}




/*
this.dataService.selecteDataItem.subscribe(res=>{
       const dataItem = this.dataService.selecteDataItem;
    })
*/