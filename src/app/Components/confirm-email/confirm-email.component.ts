import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent  implements OnInit {
  isLoading = true;
  message = '';
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['UserId'];
      const token = params['Token'];

      if (userId && token) {
        this.authService.confirmEmail(userId, token).subscribe(
          response => {
            this.message = response.message || 'Email confirmed successfully!';
            this.isSuccess = true;
            this.isLoading = false;
          },
          error => {
            this.message = error.error.message || 'Email confirmation failed!';
            this.isSuccess = false;
            this.isLoading = false;
          }
        );
      } else {
        this.message = 'Invalid confirmation link.';
        this.isSuccess = false;
        this.isLoading = false;
      }
    });
  }
}
