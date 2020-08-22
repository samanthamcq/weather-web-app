import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiBaseUrl: string = environment.apiBaseUrl;
  private name = '';
  private email = '';
  private userId = '';

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.setUserInfo(currentUser);
    }
  }

  public get currentUserId(): string {
    return this.userId;
  }

  public get currentUserEmail(): string {
    return this.email;
  }

  public get currentUserValue(): User {
    if (this.name === '') {
      return null;
    } else {
      const user: User = {
        fullName: this.name,
        email: this.email
      };
      return user;
    }
  }

  postUser(user: User) {
    return this.http.post(this.apiBaseUrl + '/register', user);
  }

  getUser(user: User) {
    return this.http.get(this.apiBaseUrl + '/getuser/' + user.email)
      .pipe(
        tap(data => {
          localStorage.setItem('currentUser', JSON.stringify(data[0]));
          this.setUserInfo(data[0]);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }
        )
      );
  }

  private setUserInfo(user: any) {
    this.userId = user._id;
    this.name = user.fullName;
    this.email = user.email;
  }
}
