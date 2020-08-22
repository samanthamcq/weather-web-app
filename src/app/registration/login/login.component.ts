import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email]],

      password: ['', [
        Validators.required]]
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = 'loading';
    const loginEmail = this.loginForm.get('email').value;

    const user: User = {
      fullName: '',
      email: loginEmail
    };

    this.authenticateUser(user);
  }

  authenticateUser(user: User) {
    this.userService.getUser(user).subscribe(
      (res: any) => {
        this.loading = '';
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      (err: any) => {
        this.loading = '';
        if (err.status === 422) {
          this.error = err.error.join('<br/>');
        } else {
          this.error = 'Email Not Found';
        }
        this.loginForm.reset();
      }
    );
  }

}
