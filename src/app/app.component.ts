import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./Components/Auth/register/register.component";
import { LoginComponent } from "./Components/Auth/login/login.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FooterComponent } from "./Components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, LoginComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Store';
}
