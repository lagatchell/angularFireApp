// Angular
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// Models
import { User } from '../models/user';

// Injectables
import { SnackBarComponent } from '../../shared/snackbar.component';

// Other
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;
    currentURL: string;

    constructor( 
        private router: Router, 
        private snackBar: SnackBarComponent, 
        public afAuth: AngularFireAuth 
    ) { 
        this.setAuthState();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.currentURL = state.url;
        return this.verifyLogin();
    }

    setAuthState() {
        this.afAuth.auth.onAuthStateChanged(user => {
            if(user !== null) {
                this.userLoggedIn = true;
                this.loggedInUser = user.email;
                this.authUser = user;
                this.router.navigateByUrl(this.currentURL);
            } 
            else {
                this.userLoggedIn = false;
                this.loggedInUser = null;
                this.authUser = null;
                this.currentURL = "/auth/movies";
                this.router.navigate(['']);
            }
        });
    }

    verifyLogin(): boolean {
        return this.userLoggedIn;
    }

    register(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.router.navigate(['/auth/movies']);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    login(loginEmail: string, loginPassword: string) {
        this.afAuth.auth.signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch((error) => {
            this.snackBar.open('Unable to login. Try again!');
        });
    }

    logout() {
        this.afAuth.auth.signOut()
        .then(() => {
            this.snackBar.open('Logged out');
        }).catch((error) => {
            this.snackBar.open('Unable to logout. Try again!');
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
        })
        .then(() => {
            if(typeof(newPassword) != 'undefined' && newPassword != null && newPassword != "")
            {
                this.afAuth.auth.currentUser.updatePassword(newPassword)
                .catch(function(error){
                    console.log(error.message);
                })
            }
        })
        .then(() => {
            this.snackBar.open('Update sucessful!');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
}