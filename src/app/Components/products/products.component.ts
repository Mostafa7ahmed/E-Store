import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BannerpageComponent } from "../bannerpage/bannerpage.component";
import { Products } from '../../Core/interfaces/products';
import { Pagination } from '../../Core/interfaces/pagination';
import { ProductsService } from '../../Core/Service/products.service';
import { GlobalService } from '../../Core/Service/global.service';
import { RouterLink } from '@angular/router';
import { DesriptionPipe } from '../../Core/pipe/desription.pipe';
import { BestproductsComponent } from "../bestproducts/bestproducts.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, DesriptionPipe, BestproductsComponent , BannerpageComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  bannerImage: string = 'productsbanner.png';
  titlePage:string="Shop Page";


  

  subscription: any;
  products: Products[] = [];
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 12;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';
  isloading:boolean =false;
  constructor(private _ProductsService: ProductsService , private _globalService:GlobalService) { }

  loadProducts() {
    this.isloading=true;
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, this.sort, this.search)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
          this.isloading=false;

          console.log(res)

        },
        error: (err) => { }
      })
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadProducts();
  }

  ngOnInit(): void {
    this.imgDomain = this._globalService.productImage;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
