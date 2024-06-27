import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from '../../../../Services/admins.service';
import { IAdminDTO } from '../../../../models/Admins/IAdminDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {

  admin: IAdminDTO = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    birthDate: ''
  };

  constructor(private router: Router, private adminService: AdminsService) {}

  onSubmit(adminForm: NgForm) {
    if (adminForm.valid) {
      this.adminService.addAdmin(this.admin).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/adminDashboard']);
        },
        error: (error) => {
          console.error('Error adding admin:', error);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/adminDashboard']);
  }
}
