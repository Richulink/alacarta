import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListfoodComponent } from './components/listfood/listfood.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserloginGuard } from './guards/userlogin.guard';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
   redirectTo: 'login',
  },
   {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate: [UserloginGuard]
    
  },
  {
   path: 'menu/:id',
   component:MenuComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 
  
 }
