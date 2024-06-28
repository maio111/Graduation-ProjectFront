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

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private citiesService:CityService
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
    })
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { mismatch: true };
  }

  register() {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value;
      this.registrationService.register(user).subscribe(
        response => {
          console.log(response.data);
          this.successMessage = 'Registration successful!';
          setTimeout(() => {
            this.successMessage = null;
           // Navigate to home after registration success
          }, 5000); // Navigate to home after 3 seconds
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
