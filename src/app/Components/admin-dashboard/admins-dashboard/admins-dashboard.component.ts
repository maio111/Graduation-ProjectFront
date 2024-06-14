import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../Services/user.service';
import { IUser } from '../../../models/iuser';

@Component({
  selector: 'app-admins-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admins-dashboard.component.html',
  styleUrls: ['./admins-dashboard.component.css']
})
export class AdminsDashboardComponent implements OnInit {
  users!: IUser[];
  currentUserId!: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        console.log('User fetching completed.');
      }
    });
  }

  navigateToEdit(id: string, user: IUser) {
    this.currentUserId = id;
    this.router.navigate(['dashboard/editUser', this.currentUserId], {
      queryParams: { user: JSON.stringify(user) }
    });
  }

  navigateToDetails(id: string) {
    this.currentUserId = id;
    this.router.navigate(['dashboard/detailsUser', this.currentUserId]);
  }

  deleteUser(id: string) {
    this.currentUserId = id;
    this.userService.deleteUser(this.currentUserId).subscribe({
      next: (res) => { console.log(res); },
      error: (res) => { console.log(res); },
      complete: () => { 
        console.log("complete"); 
        this.getAllUsers(); // Refresh the user list after deletion
      }
    });
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addUser']);
  }
}
