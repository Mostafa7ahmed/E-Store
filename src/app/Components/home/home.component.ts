import { GlobalService } from './../../Core/Service/global.service';
import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { ProductsService } from '../../Core/Service/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DesriptionPipe } from '../../Core/pipe/desription.pipe';
import { HundredComponent } from "../hundred/hundred.component";
import { ServiehomeComponent } from "../serviehome/serviehome.component";
import { BestproductsComponent } from "../bestproducts/bestproducts.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DesriptionPipe, RouterLink, BannerComponent, HundredComponent, ServiehomeComponent, BestproductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  products: any[] = [];
  imgDomain: string = '';
  isloading:boolean =false;
  constructor(private _ProductsService: ProductsService , private _GlobalService:GlobalService) { }

  loadProducts() {

    this.isloading =true;
  this._ProductsService.getAllProducts(8, 1, '-sold', '').subscribe({
    
      next: (res) => { 
        this.products = res.data
        console.log(res.data)
        this.isloading =false;

      
      },
      error: (err) => { }
    })
  }


  ngOnInit(): void {
    this.imgDomain = this._GlobalService.productsImage;
    this.loadProducts();
  }



}

