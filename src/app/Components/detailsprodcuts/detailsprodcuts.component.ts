import { GlobalService } from './../../Core/Service/global.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeofferComponent } from "../timeoffer/timeoffer.component";
import { Products } from '../../Core/interfaces/products';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../Core/Service/products.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../Core/Service/reviews.service';

@Component({
  selector: 'app-detailsprodcuts',
  standalone: true,
  
  imports: [TimeofferComponent , CommonModule , ReactiveFormsModule],
  templateUrl: './detailsprodcuts.component.html',
  styleUrl: './detailsprodcuts.component.scss'
})
export class DetailsprodcutsComponent implements OnInit , OnDestroy {


  subscription: any;
  product: Products = {};
  imgDomain: string = '';
  id: string = '';
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor(private _ProductsService: ProductsService, private _ReviewsService: ReviewsService,
    private _ActivatedRoute: ActivatedRoute , private GlobalService:GlobalService) { }

  loadProduct(productId: string) {
    this.subscription = this._ProductsService.getProduct(productId).subscribe({
      next: (res) => {
        
        this.product = res.data;

       },
      error: (err) => { },
    })
  }

  addReview(productId: string, formData: FormGroup) {
    this._ReviewsService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        console.log(res)
        this.loadProduct(this.id);
      },
      error: (err) => {
        if (err.error.errors) {
          this.reviewError = err.error.errors[0].msg;
        } else {
          this.reviewError = 'login first to add review';
        }
      }
    })
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this.GlobalService.productsImage;
    this.loadProduct(this.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
