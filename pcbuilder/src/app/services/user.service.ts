import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

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

    loginUser(loginData: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, loginData);
    }
}