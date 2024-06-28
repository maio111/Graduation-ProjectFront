import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from '../../../../Services/admins.service';
import { IAdminDTO } from '../../../../models/Admins/IAdminDTO';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  adminForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminsService) {
    
  }

  
  ngOnInit(): void {
    this.adminForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.adminService.addAdmin(this.adminForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.successMessage = 'Admin successfully added.';
          this.errorMessage = ''; // Clear any previous error messages
          this.router.navigate(['/dashboard/adminDashboard']);
        },
        error: (error) => {
          console.error('Error adding admin:', error);
          this.successMessage = ''; // Clear any previous success messages
          this.errorMessage = error.error?.message || 'An error occurred while adding the admin.';
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/adminDashboard']);
  }
}
