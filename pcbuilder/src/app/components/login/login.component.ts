import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    // username instead of email? -> minLength(6)
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    // eventually send a request to the server..
    console.log(this.loginForm.value);
  }
}
