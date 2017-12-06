import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { SnackBarComponent } from '../../shared/snackbar.component';

import { UserService } from './user.service';
import { MovieService } from './movie.service';

import { Movie } from '../models/movie';

@Injectable()
export class WishListService {

    constructor(
        public snackBar: SnackBarComponent,
        public userSVC: UserService,
        public movieSVC: MovieService,
        private readonly afd: AngularFireDatabase
    ){}

    getWishlist$() {
        let wishlist: Observable<any> = this.afd.list('wishlist/' + this.userSVC.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieSVC.movies;

        return Observable.combineLatest(wishlist, movies).map(([wishList, movieList]) => {
            let returnedMovies = [];
            wishList.forEach(wl => {
                movieList.forEach(m => {
                    if (wl.movieId === m.id) {
                        returnedMovies.push({
                            title: m.title,
                            movieId: m.id,
                            id: wl.id
                        });
                    }
                });
            });  
            return returnedMovies;
        });
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