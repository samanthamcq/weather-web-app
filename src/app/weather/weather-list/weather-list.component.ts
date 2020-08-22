import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Location } from 'src/app/models/location.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit, OnDestroy {
  locations: Location[];
  locationSubscription: Subscription;

  constructor(
    private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.locationSubscription = this.weatherService.locationsObservable.subscribe(
      (locations) => { this.locations = locations; }
    );
  }

  ngOnDestroy() {
    if (this.locationSubscription != null) {
      this.locationSubscription.unsubscribe();
    }
  }
}
