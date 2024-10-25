import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserUpdateComponent } from './user-update-form/user-update.component';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://reelrendezvous-0ea25cfde7d6.herokuapp.com';
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';

  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }


// User Registration //
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/signup', userDetails).pipe(
    catchError(this.handleError)
    );
  }


// User Login //
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
    catchError(this.handleError)
    );
  }


// Get All Movies //
  public getAllMovies(): Observable<any> {
    // let grabToken = JSON.stringify(localStorage.getItem("token"))
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Get One Movie //
  public getOneMovie(title: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/' + title, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Get Movie By Director //
  public getMovieByDirector(directorName: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Get Movie By Genre //
  public getMovieByGenre(genreName: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }



// Get User //
  public getUser(Username: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/users/' + Username, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }



// Get User Favorites //
  public getUserFavorites(userData: any, title: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/users/' + userData + '/movies/' + title, {
      headers: new HttpHeaders({
        // Authorization: `Bearer ${grabToken}`
      })
    // catchError(this.handleError)
    })
  }



// Add User Favorites //
  public addUserFavorites(userData: any, title: string): Observable<any> {
    let grabToken = localStorage.getItem("token");
    return this.http.post(apiUrl + '/users/' + userData + '/movies/' + title, {}, { // Use an empty object for the body if there's no data to send
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Edit User //
  public editUser(userData: any): Observable<any> {
    const grabToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "");
  
    return this.http.put(apiUrl + '/users/' + userData.Username, userData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Delete User //
  public deleteUser(username: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.delete(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


// Delete User Favorite //
  public deleteUserFavorites(username: string, title: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.delete(apiUrl + '/users/' + username + '/movies/' + title, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }
}


