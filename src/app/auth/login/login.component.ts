import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })
 
export class LoginComponent { 
  email: string;
  password1: string;
  
  constructor(private userSVC: UserService, private router: Router){}

  login(){
    if (this.email !== undefined && this.password1 !== undefined) {
      this.userSVC.login(this.email, this.password1);
      this.userSVC.verifyUser();
    }
  }

  signup(){
    this.router.navigate(['/auth/signup']);
  }

  cancel(){
    this.router.navigate(['']);
  }
}