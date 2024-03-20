import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  isSignUpMode: boolean = false;
  isForgetPasswordMode: boolean = false;
  forgetEmail: string = '';
  fullname: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  emailError: string = '';
  passwordError: string = '';
  repeatPasswordError: string = '';
  fullnameError: string = '';
  responseMessage: string = '';
  SignUptoogler:boolean =false;
  githubUsername: string = '';
  authToken: string = '';

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
    this.isForgetPasswordMode = false;
    this.responseMessage = '';

    setTimeout(() => {
      this.SignUptoogler =!this.SignUptoogler;
    }, 750);
  }

  handleForgetPassword(): void {
    this.isForgetPasswordMode = true;
    this.isSignUpMode = false;
    this.responseMessage = '';
  }

  handleRemembered(): void {
    this.isForgetPasswordMode = false;
    this.responseMessage = '';
  }

  handleFormSubmit(): void {
    console.log("Handelling");
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9]{3,})(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const nameRegex = /^.{5,}$/;
    
    //const usernameRegex =/^[a-zA-Z](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    // Proceed with form submission
    if (this.isSignUpMode) {
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Invalid email format';
        return;
      } else {
        this.emailError = '';
      }
      // Handle signup form submission
      if (!nameRegex.test(this.fullname)) {
        this.fullnameError = 'Full name must be at least 5 characters';
        return;
      } else {
        this.fullnameError = '';
      }
      if (!passwordRegex.test(this.password)) {
        this.passwordError = 'Password must contain at least 8 characters with minimum 3 numbers and a special character';
        return;
      } else {
        this.passwordError = '';
      }
      if (this.password !== this.repeatPassword) {
        this.repeatPasswordError = 'Passwords do not match';
        return;
      } else {
        this.repeatPasswordError = '';
      }
      // if (!usernameRegex.test(this.githubUsername)) {
      //   this.responseMessage = 'Invalid GitHub username format';
      //   return;
      // } else {
      //   this.responseMessage = '';
      // }
      this.http.post<any>('http://localhost:6767/api/signup', {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        githubUsername: this.githubUsername,
        authToken: this.authToken
      }).subscribe(
        response => {
          console.log('Signup successful:', response);
          this.responseMessage = "";
          this.isSignUpMode=false;
        },
        error => {
          console.error('Error during signup:', error);
          this.responseMessage = error.message;
        }
      );
    } else {
      if (this.isForgetPasswordMode) {

        if (!emailRegex.test(this.forgetEmail)) {
          this.emailError = 'Invalid email format';
          return;
        } else {
          this.emailError = '';
        }

        // Handle forget password form submission
        this.http.post<any>('http://localhost:6767/api/send/PasswordReset/Email', {
          email: this.forgetEmail
        }).subscribe(
          response => {
            console.log('Password reset email sent successfully:', response);
            this.responseMessage = response.message;
          },
          error => {
            console.error('Error sending password reset email:', error);
            this.responseMessage = error.message;
          }
        );
      } else {
        if (!emailRegex.test(this.email)) {
          this.emailError = 'Invalid email format';
          return;
        } else {
          this.emailError = '';
        }
        // Handle signin form submission
        this.http.post<any>('http://localhost:6767/api/signin', {
          email: this.email,
          password: this.password
        }).subscribe(
          response => {
            // console.log('Signin successful:', response);
            // window.localStorage.setItem("jwtToken",response.token);
            // this.responseMessage = response.message;
            // this.router.navigate(['']);
            if (response ) {
              console.log('Signin successful:', response);
              window.localStorage.setItem("jwtToken",response.token);
              this.responseMessage = response.message;
              this.router.navigate(['']);
             
          } else {
              console.error('Error during signin: Email not verified');
              this.responseMessage = 'Email is not verified!';
          }
      
          },
          error => {
            console.error('Error during signin:', error);
            this.responseMessage = error.message;
          }
        );
      }
    }
  }
}
