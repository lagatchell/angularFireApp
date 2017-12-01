import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material';

import { UserService } from './user.service';

@Injectable()
export class WishListService {

    moviesIDs: Observable<any[]>;

    constructor(
        public snackBar: MatSnackBar,
        public userSVC: UserService,
        private readonly afd: AngularFireDatabase
    ){}

    getWishlistMovieIDs$() {
        this.moviesIDs = this.afd.list('wishlist/' + this.userSVC.authUser.uid).valueChanges();
        return this.moviesIDs;
        /* const self = this;
        return Observable.fromPromise(firebase.database().ref('wishlist/'+ self.userSVC.authUser.uid).once('value')
            .then((snapshot)=> {
                if (snapshot.val() !== null) {
                    let tmp: string[] = snapshot.val();
                    return Object.keys(tmp).map(key => tmp[key]);
                }
                else {
                    return null;
                }
            })); */
    }

    addMovie(userID, movie) {
        const self = this;
        
        let dbRef = firebase.database().ref('wishlist/'+ userID);
        let wishlistMovie = dbRef.push();
        wishlistMovie.set ({
            movieId: movie.id,
            id: wishlistMovie.key
        })
        .then(function(){
            self.openSnackBar(movie.title + ' has been added to your wish list','');
        })
        .catch(function(error){
            console.log(error.message);
        });
    }

    removeMovie(userID, wishlistKey, movieTitle) {
        const self = this;

        let dbRef = firebase.database().ref('wishlist/'+userID).child(wishlistKey).remove()
            .then(function(){
                self.openSnackBar(movieTitle + ' has been removed from your wish list','');
            })
            .catch(function(error){
                console.log(error.message);
            });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}