import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './registration/signup/signup.component';
import { LoginComponent } from './registration/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { WeatherSearchComponent } from './weather/weather-search/weather-search.component';
import { WeatherListComponent } from './weather/weather-list/weather-list.component';
import { WeatherDetailComponent } from './weather/weather-detail/weather-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthGuard } from './auth/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: WeatherListComponent, canActivate: [AuthGuard]},
      { path: 'search/:city', component: WeatherSearchComponent, canActivate: [AuthGuard]},
      { path: 'detail/:city', component: WeatherDetailComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
