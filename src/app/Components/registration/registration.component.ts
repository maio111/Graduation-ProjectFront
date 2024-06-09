import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  selected = 'option2';
}
