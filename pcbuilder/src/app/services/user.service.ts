import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service'; //
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient, private authService: AuthService) { }

    // getUsers(): Observable<any> {
    //     return this.http.get<any>(this.apiUrl);
    // }

    // Add a user via register form
    // addUser(userData: User): Observable<User> {
    //     return this.http.post<User>(this.apiUrl, userData);
    // }
    registerUser(userData: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    // loginUser(loginData: User): Observable<any> {
    //     return this.http.post(`${this.apiUrl}/login`, loginData);
    // }

    // This one works 
    loginUser(loginData: User): Observable<any> {
        return this.http.post<User>(`${this.apiUrl}/login`, loginData).pipe(
            tap(user => this.authService.login(user)),  // Notify AuthService upon successful login
            catchError(error => {
                console.error('Login error:', error);
                return of(null);  // Handle login error (e.g., user not found or wrong credentials)
            })
        );
    }

    // Works but breaks Auth Service/Header?
    // loginUser(loginData: User): Observable<any> {
    //     return this.http.post<User>(`${this.apiUrl}/login`, loginData).pipe(
    //         tap(user => {
    //             if (user && user.email) {  // Assuming email will be non-null only on successful login
    //                 this.authService.login(user);  // Notify AuthService upon successful login
    //             }
    //         }),
    //         catchError(error => {
    //             console.error('Login error:', error);
    //             return of(null);  // Handle login error (e.g., user not found or wrong credentials)
    //         })
    //     );
    // }
}