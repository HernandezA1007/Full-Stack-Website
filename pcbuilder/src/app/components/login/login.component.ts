import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
// import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    // username or email option?
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) // new passwords are 8
  });
  loginError: string = '';

  constructor(private userService: UserService, private router: Router) {} // private authService: AuthService

  onSubmit() {
    // console.log(this.loginForm.value);

    if (this.loginForm.value) {
      this.userService.loginUser(this.loginForm.value as User).subscribe({
        next: (response) => {
          console.log("User logged in:", response);
          this.router.navigate(['/']); // Redirect to home page
        },
        error: (error) => console.error("Failed to log in:", error)
      });
    } else {
      console.error("Login form is not valid:", this.loginForm.errors);
    }

    // Works but breaks Auth Service/Header?
    // if (this.loginForm.valid) {
    //   this.userService.loginUser(this.loginForm.value as User).subscribe({
    //     next: (user) => {
    //       if (user) {
    //         console.log("User logged in:", user);
    //         this.router.navigate(['/']); // Redirect to home page only on successful login
    //       } else {
    //         this.loginError = 'Invalid email or password. Please try again.';
    //       }
    //     },
    //     error: (error) => {
    //       console.error("Failed to log in:", error);
    //       this.loginError = 'Login failed due to server error. Please try again later.';
    //     }
    //   });
    // } else {
    //   console.error("Login form is not valid:", this.loginForm.errors);
    // }
  }
}
