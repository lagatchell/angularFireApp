// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import {UserService} from '../services/user.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  email: string;
  password1: string;
  password2: string;
  passwordFail: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ){}

  signUp(){
    if (this.password1 !== this.password2) {
      this.passwordFail = true;
    } else {
      this.passwordFail = false;
      if (this.email !== undefined && this.password1 !== undefined) {
        this.userService.register(this.email, this.password1);
      }
    }
  }

  cancel(){
    this.router.navigate(['/auth/login']);
  }
  
 }