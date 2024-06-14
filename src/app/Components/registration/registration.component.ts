import { Component } from '@angular/core';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from '../../Services/Registration/registration.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { User } from '../../models/user';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { mismatch: true };
  }

  register() {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value;
      this.registrationService.register(user).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
