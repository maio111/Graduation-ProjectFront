import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  submitting = false;
  messageSuccess = false;
  messageError = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      this.messageSuccess = false;
      this.messageError = false;

      // Simulate an API call
      setTimeout(() => {
        this.submitting = false;
        this.messageSuccess = true;
        this.contactForm.reset();
      }, 2000);
    } else {
      this.messageError = true;
    }
  }
}
