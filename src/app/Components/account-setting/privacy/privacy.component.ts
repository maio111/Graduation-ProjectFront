import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Passport } from '../../../models/passport';
import { CommonModule } from '@angular/common';
import { PassportService } from '../../../Services/passport.service';
import { AuthenticationService } from '../../../Services/Authentication/authentication.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [SideBarComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  passportUpdateForm!: FormGroup;
  passport: Passport;
  user: any = {};
  showSuccessAlert = false;
  showErrorAlert = false;
  showFileInput = false;

  constructor(
    private fb: FormBuilder,
    private passportService: PassportService,
    private auth: AuthenticationService
  ) {
    this.passport = {
      id: 1,
      nid: '',
      passportNumber: '',
      expiryDate: '',
      firstName: '',
      lastName: '',
      issuingCountry: ''
    };
  }

  ngOnInit(): void {
    this.passportUpdateForm = this.fb.group({
      id: [this.passport.id],
      firstName: [this.passport.firstName, Validators.maxLength(50)],
      lastName: [this.passport.lastName, Validators.maxLength(50)],
      nationalId: [this.passport.nid, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      passportNumber: [this.passport.passportNumber, [Validators.required, Validators.maxLength(20)]],
      issuingCountry: [this.passport.issuingCountry, Validators.maxLength(100)],
      expiryDate: [this.passport.expiryDate, Validators.required]
    });

    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    const userId = this.auth.getUserIdFromToken(decoded);

    this.auth.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data;
        console.log(this.user);
        this.getUserPassport();
      },
      error: (err: any) => console.error(err)
    });
  }

  getUserPassport() {
    if (!this.user.id) {
      console.error('User ID is undefined');
      return;
    }
    this.passportService.getPassportByUserId(this.user.id).subscribe({
      next: (res) => {
        this.passport = res.data;
        console.log(this.passport);
        this.passportUpdateForm.patchValue(this.passport);
      },
      error: (err) => console.log(err)
    });
  }

  onSubmit(): void {
    if (this.passportUpdateForm.valid) {
      const formValues = this.passportUpdateForm.value;

      this.passportService.updatePassport(this.passport.id, formValues).subscribe({
        next: (response: any) => {
          console.log('Passport updated successfully:', response);
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
        },
        error: (error: any) => {
          console.error('Error updating passport:', error);
          this.showSuccessAlert = false;
          this.showErrorAlert = true;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  closeAlert(): void {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }

  showInput(): void {
    this.showFileInput = true;
  }

  hideInput(): void {
    this.showFileInput = false;
  }
}
