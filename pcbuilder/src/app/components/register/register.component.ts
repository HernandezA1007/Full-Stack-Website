import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
// export class RegisterComponent {
//   registerForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     confirmPassword: new FormControl('', [Validators.required])
//   });

export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.maxLength(16),
      Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[A-Z]).{8,}')
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator() });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('password')!.value === g.get('confirmPassword')!.value
  //      ? null : {'mismatch': true};
  // }
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatch': true };
    };
  }

  /*
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
  */
  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value as User).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/login']); // Redirect to login page after registration
        },
        error: (err) => console.error('Registration failed', err)
      });
    } else {
      console.error('Form is not valid', this.registerForm.errors);
    }
  }
}
