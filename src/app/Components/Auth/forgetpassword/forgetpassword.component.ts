import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Core/Service/user.service';
import { ToastService } from '../../../Core/Service/toast.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  sendMailError: string = '';
  verifyCodeError: string = '';
  resetPasswordError: string = '';
  sendMailFlag: boolean = false;
  verifyCodeFlag: boolean = false;
  isloading: boolean = false;



  sendMailForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.maxLength(6)])
  })
  resetPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  constructor(private _user: UserService, private _Router: Router , private _ToastService :ToastService) { }


  
  sendMail(formData: FormGroup) {
    this._user.sendMail(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('verify', res.resetToken)
        this.sendMailFlag = true;
      }
    })
  }


  verifyCode(formData: FormGroup) {
    this._user.verifyCode(formData.value).subscribe({
      next: (res) => { this.verifyCodeFlag = true },
      error: (err) => {
         this.verifyCodeError = err.error.message 
         this._ToastService.showToast("error", err.error.message);

        }
    })
  }
  resetPassword(formData: FormGroup) {
    this._user.resetPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.removeItem('verify')
        this.sendMailFlag = false;
        this.verifyCodeFlag = false;
        this._Router.navigate(['/login'])
      },
      error: (err) => { 
        this.resetPasswordError = err.error.errors[0].msg
        this._ToastService.showToast("error", err.error.errors[0].msg);

       }
    })
  }

}
