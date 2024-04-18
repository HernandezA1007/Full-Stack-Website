import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
// import { AuthService } from '../../services/auth.service';
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
    // username instead of email? -> minLength(6)
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService: UserService) {} // private authService: AuthService

  onSubmit() {
    // console.log(this.loginForm.value);
    if (this.loginForm.value) {
      this.userService.loginUser(this.loginForm.value as User).subscribe({
        next: (response) => console.log("User logged in:", response),
        error: (error) => console.error("Failed to log in:", error)
        // next: (response) => {
        //   console.log("User logged in:", response);
        //   this.authService.login(this.loginForm.value as User);
        // },
        // error: (error) => console.error("Failed to log in:", error)
      });
    } else {
      console.error("Login form is not valid:", this.loginForm.errors);
    }
  }
}
