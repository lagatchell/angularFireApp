// Angular
import { Component, OnInit } from '@angular/core';

// Services
import {UserService} from '../auth/services/user.service';

@Component({
    selector: 'navi-bar',
    templateUrl: './nav.component.html', 
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

    currentUser: string;
    photo: any;

    constructor(
        private userService: UserService
    ){}

    ngOnInit(){
        this.userService.afAuth.auth.onAuthStateChanged(user => {
            if (user !== null) {
                this.currentUser = user.email;
                if(user.photoURL !== null) {
                    this.photo = user.photoURL;
                }
            } else {
                this.currentUser = null;
                this.photo = null;
            }
        });
    }

    logout() {
        this.userService.logout();
    }
}