import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/models/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit, OnDestroy {
  @Input() city: string;
  weather = new Weather();
  error = '';
  iconUrl = 'http://openweathermap.org/img/wn/';

  weatherSubscription: Subscription;
  deleteCitySubscription: Subscription;

  constructor(
    private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherSubscription = this.weatherService.getCurrentWeather(this.city).subscribe(
      (data: any) => {
        this.error = '';
        this.weather.city = data.name;
        this.weather.description = data.weather[0].main;
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.icon = this.iconUrl + data.weather[0].icon + '@2x.png';
        this.weather.humidity = data.main.humidity;
      },
      error => {
        this.error = 'Not found weather for ' + this.city;
      }
    );
  }

  ngOnDestroy() {
    if (this.weatherSubscription != null) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.deleteCitySubscription != null) {
      this.weatherSubscription.unsubscribe();
    }
  }

  onClick() {
    this.router.navigate(['home/detail', this.city]);
  }

  onDelete() {
    this.deleteCitySubscription = this.weatherService.deleteCity(this.city).subscribe(
      (data: any) => {
        this.error = '';
        this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Can\'t delete ' + this.city;
      }
    );

  }
}
