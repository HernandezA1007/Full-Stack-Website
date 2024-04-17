import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private contactService: ContactService) {}

  onSubmit() {
    // console.log(this.contactForm.value);
    if (this.contactForm.valid) {
      this.contactService.sendContactForm(this.contactForm.value as Contact).subscribe({
        next: (response) => console.log("Response:", response),
        error: (error) => console.error("Failed to submit contact form:", error)
      });
    } else {
      console.error("Form is not valid:", this.contactForm.errors);
    }
  }
}
