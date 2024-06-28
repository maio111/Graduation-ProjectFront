import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdminPatch } from '../../../../models/Admins/IAdminPatch';
import { IAdminDTO } from '../../../../models/Admins/IAdminDTO';
import { AdminsService } from '../../../../Services/admins.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({

  standalone: true,
  imports: [ CommonModule,FormsModule],
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
  
})
export class EditAdminComponent implements OnInit {
  currentAdminUserName!: string;
  adminPatch: IAdminPatch = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    gender: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private adminService:AdminsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentAdminUserName = params['userName'];
    });

    this.route.queryParams.subscribe(params => {
      const adminDTO: IAdminDTO = JSON.parse(params['admin']);
      this.adminPatch = {
        userName: adminDTO.userName,
        firstName: adminDTO.firstName,
        lastName: adminDTO.lastName,
        email: adminDTO.email,
        currentPassword: '', 
        newPassword: '', 
        gender: adminDTO.gender
      };
    });
  }

  onSubmit(): void {
    
    console.log('Form submitted:', this.adminPatch);
    
    this.adminService.updateAdmin(this.currentAdminUserName,this.adminPatch).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/dashboard/adminDashboard']);
      },
      error: (error) => {
        console.error('Error updating admin:', error);
      }
    });
  }

  back(): void {
    this.router.navigate(['/dashboard/adminDashboard']);
  }
}
