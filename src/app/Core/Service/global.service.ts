import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  baseUrl: string = 'looooo';
  authRoute: string = '/api/v1/user';
  productsRoute: string = '/api/v1/products';
  
  constructor() { }
}
