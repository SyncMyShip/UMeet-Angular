// src/app/user-registration-form/user-login--form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public router: Router,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

// This is the function responsible for sending the form inputs to the backend
  // registerUser(): void {
  //   this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  //       // Logic for a successful user registration goes here! (To be implemented)
  //       this.dialogRef.close(); // This will close the modal on success!
  //       this.snackBar.open("User create success", 'OK', {
  //           duration: 2000
  //       });
  //   }, (result) => {
  //       this.snackBar.open("User create fail", 'OK', {
  //           duration: 2000
  //       });
  //   });
  // }
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(`Welcome ${result.user.Username}`, 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000
        });
      },
      // complete: () => {
      //   // Handle completion cases
      // }
    });
  }
}