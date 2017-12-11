// Angular
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

// Services
import { UserService } from './user.service';
import { MovieService } from './movie.service';

// Models
import { Movie } from '../models/movie';
import { WishlistMovie } from '../models/wishlist-movie';

// Injectables
import { SnackBarComponent } from '../../shared/snackbar.component';

// Other
import { Observable } from 'rxjs';

@Injectable()
export class WishListService {

    constructor(
        public snackBar: SnackBarComponent,
        public userService: UserService,
        public movieService: MovieService,
        private readonly afd: AngularFireDatabase
    ){}

    getWishlist$() {
        let wishlist: Observable<WishlistMovie[]> = this.afd.list('wishlist/' + this.userService.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieService.movies;

        return Observable.combineLatest(wishlist, movies).map(([wishList, movieList]) => {
            let returnedMovies: WishlistMovie[] = [];
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

    addMovie(movie: WishlistMovie) {
        const self = this;
        
        let dbRef = this.afd.database.ref('wishlist/'+ this.userService.authUser.uid);
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

    removeMovie(movie: WishlistMovie) {
        const self = this;

        this.afd.database.ref('wishlist/'+this.userService.authUser.uid).child(movie.id).remove()
            .then(function(){
                self.snackBar.open(movie.title + ' has been removed from your wish list');
            })
            .catch(function(error){
                console.log(error.message);
            });
    }
}