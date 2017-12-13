// Angular
import { Injectable, OnInit } from '@angular/core';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

// Services
import { UserService } from './user.service';
import { MovieService } from './movie.service';

// Models
import { Movie } from '../models/movie';

// Injectables
import { SnackBarComponent } from '../../shared/snackbar.component';

// Other
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

@Injectable()
export class RentService {

    constructor(
        public snackBar: SnackBarComponent,
        public userService: UserService,
        public movieService: MovieService,
        private readonly afdb: AngularFireDatabase
    ){}

    getRentedMovies$() {
        let rented: Observable<any> = this.afdb.list('rented/' + this.userService.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieService.getMovies$();

        return Observable.combineLatest(rented, movies).map(([rentedMovies, movieList]) => {
            let returnedMovies = [];
            rentedMovies.forEach(rm => {
                movieList.forEach(m => {
                    if (rm.movieId === m.id) {
                        returnedMovies.push({
                            rentedMovie: rm,
                            movie: m
                        });
                    }
                });
            });
            return returnedMovies;
        });
    }

    rentMovie(movie) {
        const self = this;
        let uniqueId = this.afdb.database.ref().child('rented/'+ this.userService.authUser.uid).push().key;

        let rentMovieData = {
            movieId: movie.id,
            id: uniqueId
        };

        let historyMovieData = {
            movieId: movie.id,
            rentedDate: this.getCurrentDate(),
            returnDate: "",
            id: uniqueId
        };

        let newRecord = {};

        newRecord['/rented/'+ this.userService.authUser.uid +'/'+ uniqueId] = rentMovieData;
        newRecord['/history/'+ this.userService.authUser.uid + '/' + uniqueId] = historyMovieData;

        this.afdb.database
        .ref()
        .update(newRecord)
        .then(() => {
            this.snackBar.open(movie.title + ' has been added to your rentals');
        });
    }

    returnMovie(rentedKey: string, movie: Movie) {
        this.afdb.list('rented/'+this.userService.authUser.uid+"/"+rentedKey).remove();

        this.afdb.database.ref('history/'+this.userService.authUser.uid).child(rentedKey)
        .update({
            returnDate: this.getCurrentDate()
        })
        .then(() => {
            this.snackBar.open(movie.title + ' has been returned');
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    getCurrentDate(): string {
        let today = new Date();
        let dd = (today.getDate()).toString();
        let mm = (today.getMonth()+1).toString();
        let yyyy = today.getFullYear();
        
        if(parseInt(dd,10)<10) {
            dd = '0'+dd;
        }
        
        if(parseInt(mm, 10)<10) {
            mm = '0'+mm;
        } 
        
        return mm + '/' + dd + '/' + yyyy;
    }
}
