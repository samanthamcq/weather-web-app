import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = '';

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.name = this.userService.currentUserValue.fullName;
  }

  onSearch(city: string) {
    if (city !== '') {
      this.router.navigate(['/home/search', city]);
    }
  }
}
