import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from '../classes/user';

import { SnackBarComponent } from '../../shared/snackbar.component';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor( 
        private router: Router, 
        private snackBar: SnackBarComponent, 
        public afAuth: AngularFireAuth 
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin();
    }

    verifyLogin(): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/auth/login']);
        return false;
    }

    register(email: string, password: string) {
        let self = this;
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(function(){
                self.verifyUser();
            })
            .catch(function(error){
                console.log(error.message);
            });
    }

    verifyUser() {
        this.authUser = this.afAuth.auth.currentUser;
        if(this.authUser)
        {
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/auth/movies']);
        }
    }

    login(loginEmail: string, loginPassword: string) {
        const self = this;
        this.afAuth.auth.signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch(function(error){
            self.snackBar.open('Unable to login. Try again!');
        });
    }

    logout() {
        const self = this;
        this.userLoggedIn = false;
        this.loggedInUser = '';
        this.afAuth.auth.signOut().then(function(){
            self.authUser = {};
            self.router.navigate(['home']);
            self.snackBar.open('Logged out');
        }).catch(function(error) {
            self.snackBar.open('Unable to logout. Try again!');
        });
    }

    updateUser(user: User, newPassword) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/users/${user.id}`).putString(user.photoURL, 'data_url');
    
        let path = storageRef.child(`images/users/${user.id}`).fullPath;

        storageRef.child(path).getDownloadURL().then(function(url){
            firebase.auth().currentUser.updateProfile({ 
                displayName: user.displayName,
                photoURL: url
             });
        });

        if(typeof(newPassword) != 'undefined' && newPassword != null && newPassword != "")
        {
            this.afAuth.auth.currentUser.updatePassword(newPassword)
            .catch(function(error){
                console.log(error.message);
            })
        }
    }
}