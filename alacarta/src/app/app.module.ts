import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { ListfoodComponent } from './components/listfood/listfood.component';
import { NavComponent } from './components/nav/nav.component';
import { JwtInterceptor } from './jwt.interceptor';
import { PipeFilter } from './pipe-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ListfoodComponent,
    NavComponent,
    PipeFilter
  ],
  imports: [
    FormsModule,
     ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
