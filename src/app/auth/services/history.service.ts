// Angular
import { Injectable } from '@angular/core';

// Firebase
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

// Services
import { UserService } from './user.service';
import { MovieService } from './movie.service';

// Models
import { RentedMovie } from '../models/rented-movie';
import { Movie } from '../models/movie';

// Other
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {

    constructor(
        public movieService: MovieService,
        public userService: UserService,
        private readonly afdb: AngularFireDatabase
    ) {}

    getRentHistory$() {
        let history: Observable<RentedMovie[]> = this.afdb.list('history/' + this.userService.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieService.getMovies$();

        return Observable.combineLatest(history, movies).map(([rentHistory, movieList]) => {
            let returnedMovies: RentedMovie[] = [];
            rentHistory.forEach(rh => {
                movieList.forEach(m => {
                    if (rh.movieId === m.id) {
                        returnedMovies.push({
                            id: rh.id,
                            movieId: rh.movieId,
                            title: m.title,
                            rentedDate: rh.rentedDate,
                            returnDate: rh.returnDate
                        });
                    }
                });
            });  
            return returnedMovies;
        });
    }
}