import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service'; //
import { User } from '../../models/user.model'; //

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent { // implements OnInit
  isLoggedIn$ = this.authService.isLoggedIn; 
  currentUser$ = this.authService.currentUserDetails; 

  constructor(private authService: AuthService) {} 

  logout() {
    this.authService.logout(); 
  }

  // currentUser: User | null = null;

  // constructor(private authService: AuthService, private userService: UserService) {}

  // ngOnInit() {
  //   this.authService.currentUserDetails.subscribe(user => {
  //     this.currentUser = user;
  //   });
  // }

  // logout() {
  //   this.authService.logout();
  // }
}
