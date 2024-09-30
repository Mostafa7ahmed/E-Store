import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'http://localhost:3400';
  authRoute: string = '/api/v1/auth';
  productsRoute: string = '/api/v1/products';
  reviewsRoute: string = '/api/v1/reviews';
  productsImage: string = `${this.baseUrl}/images/products/`;
  usersImage: string = `${this.baseUrl}/images/users/`;
  apiKey: string = 'secret123';
  constructor() { }
}
