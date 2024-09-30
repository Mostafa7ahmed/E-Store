import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
export const routes: Routes = [
 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'signIn', title: 'Signup', loadComponent: () => import('./Components/Auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'regtser', title: 'login', loadComponent: () => import('./Components/Auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./Components/Auth/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent) },
  {
    path: 'products',
    children: [
      {path:"" ,  title:"Products" , loadComponent: () => import('./Components/products/products.component').then(m => m.ProductsComponent)  },
      {path:":id" ,  title:"Products Details" , loadComponent: () => import('./Components/detailsprodcuts/detailsprodcuts.component').then(m => m.DetailsprodcutsComponent)  }

    ]
  },
  { path: 'myReviews', title: 'Reviews', loadComponent: () => import('./Components/reviews/reviews.component').then(m => m.ReviewsComponent) },


  { path: '**', title: '404 Not Found', component: NotFoundComponent },

    
];
