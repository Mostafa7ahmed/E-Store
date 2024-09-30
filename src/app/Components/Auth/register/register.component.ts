import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../Core/Service/toast.service';
import { UserService } from '../../../Core/Service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {

  isloading: boolean = false;
  passwordFieldType: boolean = true;
  rePasswordFieldType: boolean = true;


  signupFormData = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(8),
      Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/)
    ]),
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.min(8),
      Validators.pattern(/^[A-Z][a-zA-Z0-9@#$%^&+=]{7,}$/)
    ]),
  
  })

  constructor(private _User: UserService, private _Router: Router , private _ToastService:ToastService ) { }


  Signup(user:FormGroup){

    this.isloading = true;

     this._User.signup(user.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.isloading = false;
        localStorage.setItem('user', res.token);
        this._User.saveCurrentUser();
        this._Router.navigate(['/home']);
        this._ToastService.showToast("success", "Resiter in successfully");

      },
      error: (err) => {
        console.log(err)
        this._ToastService.showToast("error", err.error.errors[0].msg);

       }
     })
  }


  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType;
  }

  toggleRePasswordVisibility() {
    this.rePasswordFieldType = !this.rePasswordFieldType;
  }



  
}
