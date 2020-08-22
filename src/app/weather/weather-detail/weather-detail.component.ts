import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Weather } from 'src/app/models/weather.model';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit, OnDestroy {
  error = '';
  weathers: Weather[] = [];
  weather = new Weather();
  iconUrl = 'http://openweathermap.org/img/wn/';
  currentDate = new Date();
  newCity = true;

  addCitySubscription: Subscription;
  forecastSubscription: Subscription;
  weatherSubscription: Subscription;
  locationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.newCity = true;

    const city = this.route.snapshot.params.city;

    this.forecastSubscription = this.weatherService.getWeatherForecast(city).pipe(first())
      .subscribe((payload: any) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date().toLocaleDateString('en-GB');

        let maxTemp = Math.round(payload[0].main.temp_max);
        let minTemp = Math.round(payload[0].main.temp_min);
        let previousDate = new Date(payload[0].dt_txt);
        let day = days[previousDate.getDay()];
        let description = payload[0].weather[0].main;
        let icon = payload[0].weather[0].icon;

        for (const item of payload) {
          if (previousDate.toLocaleDateString('en-GB') === new Date(item.dt_txt).toLocaleDateString('en-GB')) {
            maxTemp = item.main.temp_max > maxTemp ? Math.round(item.main.temp_max) : maxTemp;
            minTemp = item.main.temp_min < minTemp ? Math.round(item.main.temp_min) : minTemp;
          } else {
            if (previousDate.toLocaleDateString('en-GB') !== today) {
              this.addNewForcast(minTemp, maxTemp, day, description, icon);
            }
            previousDate = new Date(item.dt_txt);
            maxTemp = Math.round(item.main.temp_max);
            minTemp = Math.round(item.main.temp_min);
            day = days[previousDate.getDay()];
            description = item.weather[0].main;
            icon = item.weather[0].icon;
          }
        }
        this.addNewForcast(minTemp, maxTemp, day, description, icon);
      }, (err) => {
        this.error = err.error.message;
        setTimeout(() => {
          this.error = '';
        }, 3000);
      });

    this.weatherSubscription = this.weatherService.getCurrentWeather(city).subscribe(
      (data: any) => {
        this.error = '';
        this.weather.city = data.name;
        this.weather.description = data.weather[0].main;
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.icon = this.iconUrl + data.weather[0].icon + '@2x.png';
        this.weather.humidity = data.main.humidity;

        this.locationSubscription = this.weatherService.locationsObservable.subscribe(
          (locations) => {
            for (const location of locations) {
              if (location.city === this.weather.city) {
                this.newCity = false;
                break;
              }
            }
          }
        );
      },
      error => {
        this.error = 'Not found weather for ' + city;
      }
    );
  }

  ngOnDestroy() {
    if (this.addCitySubscription != null) {
      this.addCitySubscription.unsubscribe();
    }
    if (this.forecastSubscription != null) {
      this.forecastSubscription.unsubscribe();
    }
    if (this.weatherSubscription != null) {
      this.weatherSubscription.unsubscribe();
    }
    if (this.locationSubscription != null) {
      this.locationSubscription.unsubscribe();
    }
  }

  private addNewForcast(minTemp: number, maxTemp: number, day: string, description: string, icon: string) {
    const weather = new Weather();
    weather.minTemp = minTemp;
    weather.maxTemp = maxTemp;
    weather.day = day;
    weather.description = description;
    weather.icon = this.iconUrl + icon.replace('n', 'd') + '@2x.png';
    this.weathers.push(weather);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  addCity() {
    this.addCitySubscription = this.weatherService.addCity(this.weather.city).subscribe(
      data => {
        this.router.navigate(['home/list']);
      },
      error => {
        this.error = 'Can\'t add ' + this.weather.city;
      }
    );
  }
}
