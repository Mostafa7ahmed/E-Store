import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Core/Service/user.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Core/Service/toast.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isloading: boolean = false;
  passwordFieldType: boolean = true;
  rePasswordFieldType: boolean = true;
  constructor(private _User: UserService, private _Router: Router , private _ToastService:ToastService ) { }


  signInFormData = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),

  
  })



  SignIn(user: FormGroup) {
    this.isloading = true;
  
    this._User.login(user.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isloading = false;
        localStorage.setItem('user', res.token);
        this._User.saveCurrentUser();
        this._Router.navigate(['/home']);
        this._ToastService.showToast("success", "Login successfully");
      },
      error: (error) => {
        this.isloading = false;
        console.log(error)
        this._ToastService.showToast("error", error.error.errors[0].msg);
      }
    });
  }
  


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  toggleRePasswordVisibility() {
    this.rePasswordFieldType = !this.rePasswordFieldType;
  }
}
