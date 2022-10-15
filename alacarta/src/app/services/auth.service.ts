import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';
import { ResInterface } from '../interfaces/res-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false); // este metodo es para saber si el usuario esta logueado o no
  private readonly TOKEN_NAME = 'http://challenge-react.alkemy.org/'; // este metodo el nombre de token
  isLoggedIn$ = this._isLoggedIn$.asObservable(); 

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  private userService: UserServiceService
*/

 url: string = "http://challenge-react.alkemy.org/";


  constructor(private http: HttpClient) 
  { 
   // this._isLoggedIn$.next(!!this.token);
  }

  loginByEmail( form:LoginInterface ): Observable <ResInterface> {
    let direccion = this.url;
    return this.http.post<ResInterface>(direccion, form) 

  }

  logout(){
    return localStorage.removeItem('token')
   
  }

}

