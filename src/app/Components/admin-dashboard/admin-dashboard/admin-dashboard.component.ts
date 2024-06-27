import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminsService } from '../../../Services/admins.service';
import { IAdminDTO } from '../../../models/Admins/IAdminDTO';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admins!: IAdminDTO[];
  currentAdminEmail!: string;
  page: any;
  total: any;

  constructor(private router: Router, private adminService: AdminsService

  ) {
    this.getAllAdmins();
  }

  ngOnInit(): void {}

  getAllAdmins() {
    this.adminService.getAllAdmins().subscribe({
      next: (res) => this.admins = res.data,
      error: (err) => console.log(err)
    });
  }

  navigateToEdit(email: string, admin: IAdminDTO) {
    this.currentAdminEmail = email;
    this.router.navigate(['dashboard/editAdmin', this.currentAdminEmail], {
      queryParams: { admin: JSON.stringify(admin) }
    });
  }

  deleteAdmin(email: string) {
    this.currentAdminEmail = email;
    this.adminService.deleteUserByEmail(this.currentAdminEmail).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/adminDashboard']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addAdmin']);
  }

  changePage(event: any) {
    this.page = event;
  }
}
