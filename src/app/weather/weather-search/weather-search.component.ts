import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/models/weather.model';
import { Location } from 'src/app/models/location.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit, OnDestroy {
  weather = new Weather();
  error = '';
  iconUrl = 'http://openweathermap.org/img/wn/';
  locations: Location[] = [];
  newCity = true;
  weatherSubscription: Subscription;
  locationSubscription: Subscription;
  addCitySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.getCurrentWeather(routeParams.city);
    });
  }

  ngOnDestroy() {
    if (this.weatherSubscription != null) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.locationSubscription != null) {
      this.locationSubscription.unsubscribe();
    }
    if (this.addCitySubscription != null) {
      this.addCitySubscription.unsubscribe();
    }
  }
  getCurrentWeather(city: string) {
    this.newCity = true;
    this.weatherSubscription = this.weatherService.getCurrentWeather(city).subscribe(
      (data: any) => {
        this.error = '';
        this.weather.city = data.name;
        this.weather.description = data.weather[0].main;
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.humidity = data.main.humidity;
        this.weather.icon = this.iconUrl + data.weather[0].icon + '@2x.png';

        this.locationSubscription = this.weatherService.locationsObservable.subscribe(
          (locations) => {
            this.locations = locations;
            for (const location of this.locations) {
              if (location.city === this.weather.city) {
                this.newCity = false;
                break;
              }
            }
          }
        );
      },
      error => {
        this.weather.city = city;
        this.getErrorMessage(error);
      }
    );
  }

  addCity() {
    this.addCitySubscription = this.weatherService.addCity(this.weather.city).subscribe(
      data => {
        this.router.navigate(['home/list']);
      },
      error => {
        this.getErrorMessage(error);
      }
    );
  }

  onClick() {
    this.router.navigate(['home/detail', this.weather.city]);
  }

  private getErrorMessage(error: HttpErrorResponse) {
    switch (error.statusText) {
      case 'Unknown Error': {
        this.error = 'Can\'t connect to the server. The server could be down.';
        break;
      }
      case 'Not Found': {
        this.error = 'Not found weather forecast for ' + this.weather.city;
        break;
      }
      default: {
        this.error = 'Oops! Something went wrong. Please try again later. ' + error.statusText;
      }
    }
  }
}
