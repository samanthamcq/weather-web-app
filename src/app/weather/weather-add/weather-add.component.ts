import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-add',
  templateUrl: './weather-add.component.html',
  styleUrls: ['./weather-add.component.css']
})
export class WeatherAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch(city: string) {
    if (city !== '') {
      this.router.navigate(['home/search', city]);
    }
  }
}
