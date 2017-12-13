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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

@Injectable()
export class WishListService {

    constructor(
        public snackBar: SnackBarComponent,
        public userService: UserService,
        public movieService: MovieService,
        private readonly afdb: AngularFireDatabase
    ){}

    getWishlist$() {
        let wishlist: Observable<WishlistMovie[]> = this.afdb.list('wishlist/' + this.userService.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieService.getMovies$();

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
        let dbRef = this.afdb.database.ref('wishlist/'+ this.userService.authUser.uid);
        let wishlistMovie = dbRef.push();
        wishlistMovie.set ({
            movieId: movie.id,
            id: wishlistMovie.key
        })
        .then(() => {
            this.snackBar.open(movie.title + ' has been added to your wish list');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    removeMovie(movie: WishlistMovie) {
        this.afdb.database.ref('wishlist/'+this.userService.authUser.uid).child(movie.id).remove()
        .then(() => {
            this.snackBar.open(movie.title + ' has been removed from your wish list');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }
}