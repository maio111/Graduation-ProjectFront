import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,CommonModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})
export class AccountSettingComponent {
  sections = [
    {
      icon: 'fa-user',
      title: 'Personal Details',
      description: "Update your info and find out how it's used.",
      manage: 'personal-details'
    },
    {
      icon: 'fa-cogs',
      title: 'Preferences',
      description: "Change your language, currency, and accessibility requirements.",
      manage: 'preferences'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Security',
      description: "Change your security settings, set up secure authentication, or delete your account.",
      manage: 'security'
    },
    {
      icon: 'fa-user-secret',
      title: 'Privacy',
      description: "Exercise your privacy rights and control how your data is used.",
      manage: 'privacy'
    }
  ];

}
