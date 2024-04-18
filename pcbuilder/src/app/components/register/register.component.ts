import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value as User).subscribe({
        next: (response) => console.log("User registered:", response),
        error: (error) => console.error("Failed to register user:", error)
      });
    } else {
      console.error("Registration form is not valid:", this.registerForm.errors);
    }
  }
}
