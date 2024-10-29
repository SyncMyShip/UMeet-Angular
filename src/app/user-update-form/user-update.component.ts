import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// const user = JSON.parse(localStorage.getItem("user") || "")
const userJson = localStorage.getItem("user");
const user = userJson ? JSON.parse(userJson) : {};

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  // @Input() userData = { Name: user.Name, Username: user.Username, Email: user.Email};


  @Input() userData = {
    Name: user.Name || '',
    // Username: user.Username || '',
    Email: user.Email || ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    public snackBar: MatSnackBar) { }


  ngOnInit(): void {}

  updateUser(): void {

    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {
        // Update localStorage with the new user data
        localStorage.setItem("user", JSON.stringify(result));
  
        // Notify the user of the successful update
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000
        });
  
        // Close the dialog
        this.dialogRef.close();
        window.location.reload();
      },
      error: (result) => {
        this.snackBar.open('Update failed', 'OK', {
          duration: 2000
        });
      },
    });
  }

  onSubmit(): void {
    this.updateUser(); // Call updateUser when the form is submitted
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}