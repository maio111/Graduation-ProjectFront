import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { AuthenticationService } from '../../../Services/Authentication/authentication.service';
import { UserUpdateDTO } from '../../../models/User/UserUpdateDTO';
import { error } from 'console';
import { environment } from '../../../../environments/environment';
import { CityService } from '../../../Services/city.service';
import { ICity } from '../../../models/City/ICity';


@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [SideBarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  defaultPhotoUrl: string = 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png';
  baseUrl: string = environment.baseUrl;
  userUpdateForm!: FormGroup;
  userData: UserUpdateDTO = {} as UserUpdateDTO;
  user: any = {} as any;
  userName: string = "";
  showFileInput: boolean = false;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  cities: ICity[] = [] as ICity[];
  userCity: ICity = {} as ICity;
  birthDate!: Date;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthenticationService,
    private citiesService: CityService
  ) {
    this.userUpdateForm = this.fb.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      gender: [''],
      address: [''],
      photo: [null],
      birthDate: [''],
      cityId: [null]
    });
  }

  ngOnInit(): void {
    this.getUserData();
    this.getAllCities();
  }

  getAllCities() {
    this.citiesService.getAllCities().subscribe({
      next: (res) => this.cities = res.data,
      error: (err) => console.log(err)
    });
  }

  getUserData() {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    const userId = this.auth.getUserIdFromToken(decoded);

    this.auth.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data;
        this.userData = { ...this.user };
        this.userUpdateForm.patchValue(this.userData);
        this.userName = res.data.userName;
        this.userData.birthDate = res.data.birthDate;
      },
      error: (err: any) => console.error(err)
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userUpdateForm.patchValue({ photo: file });
    }
  }

  onSubmit(): void {
    if (this.userUpdateForm.valid) {
      const formData = new FormData();
      const formValues = this.userUpdateForm.value;

      for (const key in formValues) {
        if (formValues[key] !== null && formValues[key] !== undefined) {
          formData.append(key, formValues[key]);
        }
      }

      this.userService.updateUserInfo(this.user.id, formData).subscribe({
        next: (response: any) => {
          console.log('User updated successfully:', response);
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          this.showSuccessAlert = false;
          this.showErrorAlert = true;
        }
      });
    }
  }

  closeAlert(): void {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }

  showInput(): void {
    this.showFileInput = true;
  }

  hideInput(): void {
    this.showFileInput = false;
  }
}
