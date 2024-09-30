import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  baseUrl: string = 'http://localhost:3400';
  authRoute: string = '/api/v1/auth';
  categoryRoute:string = '/api/v1/categories'
  subCategoryRoute:string = '/api/v1/subcategory'
  productRoute: string = '/api/v1/product';
  userRoute: string = '/api/v1/users'
  cartRoute:string= '/api/v1/carts'
  couponsRoute:string = '/api/v1/coupon'
  cartImage: string =` ${this.baseUrl}/carts/`;
  ordersRoute: string = '/api/v1/orders';
  wishlistRoute: string = '/api/v1/wishlist';
  productImage: string = `${this.baseUrl}/products/`;
  usersImage: string =` ${this.baseUrl}/images/users/`;
  categoryImage: string = `${this.baseUrl}/categories/`;
  apiKey: string = 'secret123';

  
  constructor() { }
}
