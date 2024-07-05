import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  ngOnInit(): void {
    // Initialize component data or perform initialization logic
  }
  editDetail(detail: string) {
    console.log(`Editing ${detail}`);
    // Implement the logic to edit the detail
  }
}
