import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { LoginInterface } from 'src/app/interfaces/login-interface';
import { ReqStatus } from 'src/app/interfaces/req-status';
import { ResInterface } from 'src/app/interfaces/res-interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });


  constructor(private authService: AuthService, private router: Router) { }

  errorMessage = "";

  submitForm(form: LoginInterface) {
    //   try {
    this.authService.loginByEmail(form).subscribe(data => {
      let datatoken: ResInterface = data;

      if (datatoken) {
        localStorage.setItem("token", datatoken.token)
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Muy bien!',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.router.navigate(['/home'])
        })
       
      } 
    })
  }
}










