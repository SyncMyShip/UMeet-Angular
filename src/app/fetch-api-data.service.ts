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

/**
 * Service for handling myFlixAPI calls.
 */
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


/**
 * POST /signup
 * @returns {Object} New user object:<br>
 *  <pre>
    {    
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string
    }</pre>
 */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/signup', userDetails).pipe(
    catchError(this.handleError)
    );
  }


/**
 * POST /login
 * @returns {Object} User object:<br>
 *  <pre>
    {    
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string,
        "Token": string
    }</pre>
 */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
    catchError(this.handleError)
    );
  }


/**
 * GET /movies
 * @returns {Array} List of movies:<br>
 *  <pre>
    {
        "Genre": {
            "Name": string,
            "Description": string
        },
        "Director": {
            "Name": string,
            "Bio": string
        },
        "_id": string,
        "Title": string,
        "Description": string,
        "Released": string,
        "Featured": boolean
    }</pre>
 */
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

/**
 * GET /movies/:Title
 * @param {string} title - The title of the movie.
 * @returns {Object} An object containing the following movie details:<br>
 *  <pre>
    {
        "Genre": {
            "Name": string,
            "Description": string
        },
        "Director": {
            "Name": string,
            "Bio": string
        },
        "_id": string,
        "Title": string,
        "Description": string,
        "Released": string,
        "Featured": boolean
    }</pre>
 */
  public getOneMovie(title: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/' + title, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


/**
 * GET /movies/directors/:Name
 * @param {string} directorName - director name
 * @returns {Object} Director details:<br>
 *  <pre>
    {
        "Name": string,
        "Bio": string
    }</pre>
 */
  public getMovieByDirector(directorName: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


/**
 * GET /movies/genres/:Name
 * @param {string} genreName - genre name
 * @returns {Object} Genre details:<br>
 *  <pre>
    {
        "Name": string,
        "Description": string
    }</pre>
 */
  public getMovieByGenre(genreName: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/movies/genres/' + genreName, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }



/**
 * GET /users/:Username
 * @param {string} Username - username
 * @returns {Object} User details:<br>
 *  <pre>
    {
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string,
        "FavoriteMovies": [],
        "_id": string,
        "__v": int
    }</pre>
 */
  public getUser(Username: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.get(apiUrl + '/users/' + Username, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }



/**
 * POST /users/:Username/movies/:MovieID
 * @param {any} userData - username
 * @param {string} title - ID of the movie to add to favorites
 * @returns {Object} User details:<br>
 *  <pre>
    {
        "_id": string,
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string,
        "FavoriteMovies": [],
        "__v": int
    }</pre>
 */
  public addUserFavorites(userData: any, title: string): Observable<any> {
    let grabToken = localStorage.getItem("token");
    return this.http.post(apiUrl + '/users/' + userData + '/movies/' + title, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


/**
 * PUT /users/:Username
 * @param {string} userData - username
 * @returns {Object} Updated user details:<br>
 *  <pre>
    {
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string,
        "FavoriteMovies": [],
        "_id": string,
        "__v": int
    }</pre>
 */
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


/**
 * DELETE /users/:Username
 * @param {string} username - username
 * @returns {string} Confirmation message:<br>
 *  <pre>Username was deleted</pre>
 */
  public deleteUser(username: string): Observable<any> {
    let grabToken = localStorage.getItem("token")
    return this.http.delete(apiUrl + '/users/' + username, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${grabToken}`
      })}).pipe(
    catchError(this.handleError)
    )
  }


/**
 * DELETE /users/:Username/movies/:MovieID
 * @param {string} username - username
 * @param {string} title - ID of the movie to remove from favorites
 * @returns {Object} User details:<br>
 *  <pre>
    {
        "_id": string,
        "Name": string,
        "Username": string,
        "Password": string,
        "Email": string,
        "DateOfBirth": string,
        "FavoriteMovies": [],
        "__v": int
    }</pre>
 */
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


