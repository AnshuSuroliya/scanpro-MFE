import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService } from '../jwt.service';


@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  profile: any = {
    id: '',
    fullname: '',
    email: '',
    password: ''
  };
  confirmPassword: string = '';
  editMode: boolean = false;
  errors: any = {
    fullname: '',
    email: '',
    confirmPassword: ''
  };
  successMessage: string = '';
  jwtToken:string ="";

  constructor(private http: HttpClient,private Jwthelper:JwtService) { }

  ngOnInit(): void {
    // Fetch current user profile data
    this.jwtToken = ""+localStorage.getItem('jwtToken');
    this.fetchCurrentUserProfile();
  }

  fetchCurrentUserProfile(): void {
      this.profile.id = this.Jwthelper.getClaim(this.jwtToken,"Id");
      this.profile.fullname = this.Jwthelper.getClaim(this.jwtToken,"Fullname");
      this.profile.email = this.Jwthelper.getClaim(this.jwtToken,"email");
  }

  updateProfile(): void {
    this.http.put(`http://localhost:6767/updateUserProfile/${this.profile.id}`, {
      ...this.profile,
      confirmPassword: this.confirmPassword
    }, { responseType: 'text' }) // Set responseType to 'text' to receive plain text response
      .subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.successMessage = response; // Assign the response directly to successMessage
          this.editMode = false;
          setTimeout(() => {
            this.successMessage = ''; // Clear success message after 5 seconds
          }, 5000);
        },
        (error) => {
          console.error('Error updating user profile:', error);
          if (error instanceof HttpErrorResponse && error.status === 400) {
            this.errors.confirmPassword = error.error; // Assuming the error message is directly in the response body
          } else {
            this.errors.confirmPassword = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
  }

  handleSubmit(): void {
    if (!this.confirmPassword) {
      this.errors.confirmPassword = 'Confirm Password is required.';
      return;
    }

    this.updateProfile();
  }

  handleResetPasswordClick(): void {
    // Implement reset password logic here
  }

  setEditMode(value: boolean): void {
    this.editMode = value;
    if (!value) {
      this.confirmPassword = ''; // Reset confirmPassword field when exiting edit mode
    }
  }
}
