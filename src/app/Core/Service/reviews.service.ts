import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reviews } from '../interfaces/reviews';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private baseUrl: string = '';
  private productsRoute: string = '';
  private reviewsRoute: string = '';
  productImage: string = '';
  apiKey: string = ``
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.reviewsRoute = this._GlobalService.reviewsRoute;
    this.productsRoute = this._GlobalService.productsRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.productImage = this._GlobalService.productsImage;
  }

  getReviews(limit: number = 50, page: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.reviewsRoute}/me?limit=${limit}&page=${page}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteReview(reviewId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.reviewsRoute}/${reviewId}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  addReview(productId: string, formData: Reviews): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.productsRoute}/${productId}/reviews`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    });
  }
}
