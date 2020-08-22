import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', [
        Validators.required]],
    });
  }

  onSubmit() {
    this.error = '';
    this.loading = 'loading';

    const name = this.signupForm.get('fullName').value;
    const signUpEmail = this.signupForm.get('email').value;
    const user: User = {
      fullName: name,
      email: signUpEmail
    };

    this.userService.postUser(user).subscribe(
      (res: any) => {
        this.loading = '';
        this.signupForm.reset();
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.loading = '';
        this.error = 'Something went wrong. Please contact admin.';
        this.signupForm.reset();
      }
    );
  }
}
