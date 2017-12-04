import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { SnackBarComponent } from '../../shared/snackbar.component';

import { UserService } from './user.service';

@Injectable()
export class WishListService {

    moviesIDs: Observable<any[]>;

    constructor(
        public snackBar: SnackBarComponent,
        public userSVC: UserService,
        private readonly afd: AngularFireDatabase
    ){}

    getWishlistMovieIDs$() {
        this.moviesIDs = this.afd.list('wishlist/' + this.userSVC.authUser.uid).valueChanges();
        return this.moviesIDs;
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
            self.snackBar.open(movie.title + ' has been added to your wish list');
        })
        .catch(function(error){
            console.log(error.message);
        });
    }

    removeMovie(userID, wishlistKey, movieTitle) {
        const self = this;

        let dbRef = firebase.database().ref('wishlist/'+userID).child(wishlistKey).remove()
            .then(function(){
                self.snackBar.open(movieTitle + ' has been removed from your wish list');
            })
            .catch(function(error){
                console.log(error.message);
            });
    }
}