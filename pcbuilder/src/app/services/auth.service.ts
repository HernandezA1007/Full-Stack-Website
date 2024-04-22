import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Observable
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private currentUserSubject = new BehaviorSubject<User | null>(null);
    // public currentUser = this.currentUserSubject.asObservable();

    // constructor() { }

    // public get currentUserValue(): User | null {
    //     return this.currentUserSubject.value;
    // }

    // login(user: User) {
    //     // Store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    // }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }

    private loggedIn = new BehaviorSubject<boolean>(false);
    private currentUser = new BehaviorSubject<User | null>(null);

    // add : Observable<boolean> {
    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    // add : Observable<User | null> {
    get currentUserDetails() {
        return this.currentUser.asObservable();
    }

    constructor() {}

    login(user: User) {
        // if (user.email !== '' && user.password !== '' ) {
        //     this.loggedIn.next(true);
        //     this.currentUser.next(user);
        // }
        this.loggedIn.next(true);
        this.currentUser.next(user);
    }

    logout() {
        this.loggedIn.next(false);
        this.currentUser.next(null);
    }
}