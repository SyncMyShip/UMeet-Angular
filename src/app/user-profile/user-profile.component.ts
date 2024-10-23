import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update-form/user-update.component';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  userData: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(
      public fetchApiData: FetchApiDataService,
      public router: Router,
      public dialog: MatDialog
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    // this.getUserDetails();
    this.getFavoriteMovies();
  }


  // getUserDetails(): void {
  //   const user = (localStorage.getItem("user"))
  //   this.fetchApiData.getUser(user).subscribe((resp: any) => {
  //     console.log(user);
  //     }, error => {
  //       console.error(error)
  //     });
  //   }

  updateUser(): void {
    this.dialog.open(UserUpdateComponent, {
      width: '280px'
    })
  }

  deleteUser(): void{
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData.deleteUser(user.Username).subscribe((resp: any) => {
      console.log(resp);
    })
    this.logout();
  }

  getFavoriteMovies(): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m : any) => {
        return this.userData.FavoriteMovies.includes(m._id);
      });
      // console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  removeFromFavorite(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    this.fetchApiData.deleteUserFavorites(user.Username, movie._id).subscribe((res: any) => {
      // Update the user's FavoriteMovies in local storage
      user.FavoriteMovies = res.FavoriteMovies;
      localStorage.setItem("user", JSON.stringify(user)); // Update local storage
  
      // Refresh the favorite movies list
      this.getFavoriteMovies();
  
      // console.log(`${movie.Title} successfully removed from favorites`);
      window.location.reload()
    }, (err: any) => {
      console.error(err);
    });
  }

  redirectHome(): void {
    this.router.navigate(["movies"])
  }
  
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}