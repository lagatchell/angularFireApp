// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })
 
export class LoginComponent { 
  email: string;
  password: string;
  
  constructor(
    private userService: UserService, 
    private router: Router
  ){}

  login(){
    if (this.email !== undefined && this.password !== undefined) {
      this.userService.login(this.email, this.password);
    }
  }

  signup(){
    this.router.navigate(['/auth/signup']);
  }

  cancel(){
    this.router.navigate(['']);
  }
}