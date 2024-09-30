import { UserService } from './../../Core/Service/user.service';
import { CommonModule } from '@angular/common';
import { Component, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // updated styleUrl to styleUrls
})
export class NavbarComponent implements OnDestroy {

  showSettings: boolean = false;
  isLogin: boolean = false;
  private globalClickListener: () => void;

  constructor(private _UserService: UserService, private renderer: Renderer2, private el: ElementRef) {
    this._UserService.currentUser.subscribe({
      next: () => {
        this.isLogin = this._UserService.currentUser.getValue() !== null;
      }
    });

    // Global listener for detecting clicks outside the settings menu
    this.globalClickListener = this.renderer.listen('document', 'click', this.handleClickOutside.bind(this));
  }

  toggleSettings(event: MouseEvent) {
    event.stopPropagation();
    this.showSettings = !this.showSettings;
  }

  handleClickOutside(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showSettings = false; 
    }
  }

  logout() {
    this._UserService.logout();
  }

  ngOnDestroy() {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }
}
