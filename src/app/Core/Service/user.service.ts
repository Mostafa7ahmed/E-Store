import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, ResetPassword, SendMail, Signup, VerifyCode } from '../interfaces/auth';
import { Router } from '@angular/router';
import  Cookies  from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = '';
  private authRoute: string = '';
  private apiKey: string = '';
  currentUser = new BehaviorSubject(null);
  authPhoto: string = 'images/phone.svg'
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _Router: Router) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.authRoute = this._GlobalService.authRoute;
    this.apiKey = this._GlobalService.apiKey;
    if (localStorage.getItem('user') !== null) {
      this.saveCurrentUser();
    }
  };
  
  saveCurrentUser() {
    const token = localStorage.getItem('user');
    if (token) {
      this.currentUser.next(jwtDecode(token));
    }
  }

  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
    }
  }

  signup(formData: Signup): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/signup`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`
        }, withCredentials: true
      })
  }

  login(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/login`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`
        }, withCredentials: true
      })
  }

  sendMail(formData: SendMail): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/forgetPassword`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`
        }, withCredentials: true
      })
  }

  verifyCode(formData: VerifyCode): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/verifyCode`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`,
          authorization: `Bearer ${localStorage.getItem('verify')}`
        }, withCredentials: true
      })
  }

  resetPassword(formData: ResetPassword): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.authRoute}/resetCode`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`,
          authorization: `Bearer ${localStorage.getItem('verify')}`
        }, withCredentials: true
      })
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this._Router.navigate(['/home'])
  }
 


}
