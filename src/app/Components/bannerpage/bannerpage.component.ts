import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bannerpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bannerpage.component.html',
  styleUrl: './bannerpage.component.scss'
})
export class BannerpageComponent {
  @Input() backgroundImage: string = '';
   @Input() TitlePage:string="";

}
