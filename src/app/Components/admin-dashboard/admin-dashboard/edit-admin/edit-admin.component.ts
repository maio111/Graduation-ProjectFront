import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from '../../../../Services/admins.service';
import { IAdminDTO } from '../../../../models/Admins/IAdminDTO';
import { IAdminPatch } from '../../../../models/Admins/IAdminPatch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
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

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.admin.email = params['email'];
      this.route.queryParams.subscribe(params => {
        this.admin = JSON.parse(params['admin']);
      });
    });
  }

  onSubmit(adminForm: NgForm) {
    if (adminForm.valid) {
      const adminPatch: IAdminPatch = {
        userName: this.admin.userName,
        currentPassword: this.admin.password,
        newPassword: '' // Add logic if needed to update password
      };

      this.adminService.updateAdmin(this.admin.email, adminPatch).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/adminDashboard']);
        },
        error: (error) => {
          console.error('Error updating admin:', error);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/adminDashboard']);
  }
}
