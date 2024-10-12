import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})

// private handleError(error: HttpErrorResponse): any {
//   if (error.error instanceof ErrorEvent) {
//   console.error('Some error occurred:', error.error.message);
//   } else {
//   console.error(
//       `Error Status code ${error.status}, ` +
//       `Error body is: ${error.error}`);
//   }
//   return throwError(
//   'Something bad happened; please try again later.');
// }

// User Registration //
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/signup', userDetails).pipe(
    // catchError(this.handleError)
    );
  }
}
// 


// User Login //
export class UserLogin {
  constructor(private http: HttpClient) {
  }
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
    // catchError(this.handleError)
    );
  }
}


// Get All Movies //
export class GetAllMovies {
  constructor(private http: HttpClient) {
  }
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Get One Movie //
export class GetOneMovie {
  constructor(private http: HttpClient) {
  }
  public getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + '/movies/' + title, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Get Movie By Director //
export class GetMovieByDirector {
  constructor(private http: HttpClient) {
  }
  public getMovieByDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + '/movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Get Movie By Genre //
export class GetMovieByGenre {
  constructor(private http: HttpClient) {
  }
  public getMovieByGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + '/movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}



// Get User //
export class GetUser{
  constructor(private http: HttpClient) {
  }
  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Get User Favorites //
export class GetUserFavorites{
  constructor(private http: HttpClient) {
  }
  public getUserFavorites(username: string, title: string): Observable<any> {
    return this.http.get(apiUrl + '/users/' + username + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}



// Add User Favorites //
export class AddUserFavorites{
  constructor(private http: HttpClient) {
  }
  public addUserFavorites(username: string, title: string): Observable<any> {
    return this.http.post(apiUrl + '/users/' + username + 'movies/' + title, {
    // catchError(this.handleError)
    })
  }
}


// Edit User //
export class EditUser{
  constructor(private http: HttpClient) {
  }
  public editUser(userData: any, username: string): Observable<any> {
    return this.http.put(apiUrl + '/users/' + username, userData, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Delete User //
export class DeleteUser{
  constructor(private http: HttpClient) {
  }
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}


// Delete User Favorite //
export class DeleteUserFavorite{
  constructor(private http: HttpClient) {
  }
  public deleteUserFavorite(username: string, title: string): Observable<any> {
    return this.http.delete(apiUrl + '/users/' + username + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: '<Bearer Token>'
      })
    // catchError(this.handleError)
    })
  }
}
