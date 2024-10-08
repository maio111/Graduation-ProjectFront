import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from '../../Services/Registration/registration.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { User } from '../../models/user';
import { CityService } from '../../Services/city.service';
import { ICity } from '../../models/City/ICity';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { LoginDTO } from '../../models/Authentication/LoginDTO';

@Component({
    selector: 'app-registration',
    standalone: true,
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NavBarComponent]
})
export class RegistrationComponent implements OnInit{
  cities: ICity[] = [] as ICity[];
  registrationForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private citiesService: CityService,
    private auth: AuthenticationService
  ) {
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

  ngOnInit(): void {
    this.citiesService.getAllCities().subscribe({
      next: (res) => this.cities = res.data,
      error: (err) => console.log(err)
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { mismatch: true };
  }

  register() {
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.registrationService.register(user).subscribe(
        response => {
          console.log(response.data);
          this.successMessage = 'Registration successful!';
          this.errorMessage = null;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate([""]);
          }, 5000);
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = 'User Name Or Email already exists';
          } else {
            this.errorMessage = 'An error occurred during registration';
          }
          console.error(error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
