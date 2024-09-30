import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private baseUrlGlobal:GlobalService,private _HttpClient:HttpClient) {


  }

  
  signUp(data:Signup):Observable<any>{

   return this._HttpClient.post(`${this.baseUrlGlobal.baseUrl}${this.baseUrlGlobal.authRoute}/register`, data)
  }}
