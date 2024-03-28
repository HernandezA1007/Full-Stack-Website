import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  adminForm = new FormGroup({
    adminUsername: new FormControl('', [Validators.required]),
    adminPassword: new FormControl('', [Validators.required])
  });

  // get adminUsername() { return this.adminForm.get('adminUsername'); }

  // get adminPassword() { return this.adminForm.get('adminPassword'); }

  onAdminSubmit() {
    console.log(this.adminForm.value);
  }
}
