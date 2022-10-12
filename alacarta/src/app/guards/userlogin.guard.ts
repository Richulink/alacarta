import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {

  constructor(private handleLocalStorage: HandleLocalStorageService,
    private router: Router){

    }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {

    console.log("permitido")
   return true;
    }

    return false;
  }
  isLogin(){
    if(localStorage.getItem('token'))
    {
      this.router.navigate['/home']
    }  
  }
}
