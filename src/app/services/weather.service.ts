import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, first } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl;
  private readonly appID: string = environment.appID;
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/';

  private locationsSubject = new BehaviorSubject<Location[]>([]);
  public readonly locationsObservable: Observable<Location[]> = this.locationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService) {

    this.getProfile(this.userService.currentUserId).subscribe(
      (res: any) => {
        this.locationsSubject.next(res[0].locations);
      }
    );
  }

  public get currentUserId() {
    return this.userService.currentUserId;
  }

  getCurrentWeather(location: any): Observable<any> {
    if (location.length === 5 && !isNaN(location)) {
      return this.http.get<any>(
        `${this.baseURL}weather?zip=${location},us&units=imperial&APPID=${this.appID}`).pipe((first()));
    } else {
      return this.http.get<any>(
        `${this.baseURL}weather?q=${location}&units=imperial&APPID=${this.appID}`).pipe((first()));
    }
  }

  getWeatherForecast(location: any): Observable<any> {
    if (location.length === 5 && !isNaN(location)) {
      return this.http.get<any>(
        `${this.baseURL}forecast?zip=${location},us&units=imperial&APPID=${this.appID}`)
        .pipe(first(), map((weather) => weather.list));
    } else {
      return this.http.get<any>(
        `${this.baseURL}forecast?q=${location}&units=imperial&APPID=${this.appID}`)
        .pipe(first(), map((weather) => weather.list));
    }
  }

  getProfile(userId: string): Observable<any> {
    return this.http.get(this.apiBaseUrl + '/getprofile/' + userId);
  }

  addCity(newCity: string): Observable<any> {
    const req = {
      userId: this.userService.currentUserId,
      city: newCity
    };
    return this.http.post(this.apiBaseUrl + '/addlocation', req)
      .pipe(
        map(res => {
          this.locationsSubject.next(res[0].locations);
          return res;
        },
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })));
  }

  deleteCity(location: string): Observable<any> {
    const req = {
      userId: this.userService.currentUserId,
      city: location
    };
    return this.http.post(this.apiBaseUrl + '/deletelocation', req)
      .pipe(
        map(res => {
          this.locationsSubject.next(res[0].locations);
          return res;
        },
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })));
  }
}
