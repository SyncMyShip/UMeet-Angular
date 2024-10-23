// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.FavoriteMovies.includes(movie._id);
      });
    }, error => {
      console.error(error);
    });
  }

  updateFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.FavoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteUserFavorites(user.Username, movie._id).subscribe(res => {
        movie.isFavorite = false; // Update the movie's favorite status
        user.FavoriteMovies = res.FavoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(`${movie.Title} successfully removed from favorites`);
      }, error => {
        console.error(error);
      });
    } else {
      this.fetchApiData.addUserFavorites(user.Username, movie._id).subscribe(res => {
        movie.isFavorite = true; // Update the movie's favorite status
        user.FavoriteMovies = res.FavoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(`${movie.Title} successfully added to favorites`);
      }, error => {
        console.error(error);
      });
    }
  }


  showGenre(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
        data: {
            title: `${String(movie.Genre.Name).toUpperCase()}`,
            content: movie.Genre.Description
        },
        width: "400px"
    })
  }

  showDirector(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
        data: {
            title: `${String(movie.Director.Name).toUpperCase()}`,
            content: movie.Director.Bio
        },
        width: "400px"
    })
  }

  showMovieDetail(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
        data: {
            title: `${movie.Title}`,
            content: movie.Description
        },
        width: "400px"
    })
  }

  // route user to their profile
  goToProfile(): void {
    this.router.navigate(["profile"]);
  }

  // logout user
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}

