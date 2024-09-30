import { Component, input, Input } from '@angular/core';
import { ProductsService } from '../../Core/Service/products.service';
import { GlobalService } from '../../Core/Service/global.service';
import { CommonModule } from '@angular/common';
import { Products } from '../../Core/interfaces/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bestproducts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bestproducts.component.html',
  styleUrl: './bestproducts.component.scss'
})
export class BestproductsComponent {

   @Input() products :Products[] =[];
   @Input() imgDomain:string ="";
   @Input() isloading :boolean =false;


}
