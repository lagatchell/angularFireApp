import { Component, OnInit } from '@angular/core';
import {UserService} from '../auth/services/user.service';

@Component({
    selector: 'navi-bar',
    templateUrl: './nav.component.html', 
    styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

    currentUser: string;
    photo: any;


    constructor(private userSVC: UserService){
        this.currentUser = userSVC.loggedInUser;
    }

    ngOnInit(){
        this.currentUser = this.userSVC.loggedInUser;

        if (this.userSVC.userLoggedIn) {
            if(this.userSVC.authUser.photoURL !== null) {
                this.photo = this.userSVC.authUser.photoURL;
            }
        }
    }

    logout()
    {
        this.userSVC.logout();
    }

}