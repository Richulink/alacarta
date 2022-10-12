import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { Observable, of, pipe, throwError as observablethrowError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements HttpInterceptor {
  

  constructor(private http: HttpClient) {}

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }


  private authUrl = 'http://challenge-react.alkemy.org/';
  

  login(username: string, password: string) {

    try{ 
    return this.http.post('http://challenge-react.alkemy.org/', { username, password })
    }catch{
      console.log( "errroooorrrr")
      return throwError('error de login')
    }
      
  }











  logout() {
    localStorage.removeItem('token');
  }
 
  public get logIn(): boolean {

    return (localStorage.getItem('token') !== null);
  }

  /*
  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('products', {
      headers: {},
    });
  }
  */

}
