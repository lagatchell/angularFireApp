import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { RentedMovie } from '../models/rentedMovie';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryService {

    constructor(
        public movieSVC: MovieService,
        public userSVC: UserService,
        private readonly afd: AngularFireDatabase
    ) {}

    getRentHistory$() {
        let history: Observable<any> = this.afd.list('history/' + this.userSVC.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieSVC.movies;

        return Observable.combineLatest(history, movies).map(([rentHistory, movieList]) => {
            let returnedMovies = [];
            rentHistory.forEach(rh => {
                movieList.forEach(m => {
                    if (rh.movieId === m.id) {
                        returnedMovies.push({
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

    getCurrentDate(): string
    {
        let today = new Date();
        let dd = (today.getDate()).toString();
        let mm = (today.getMonth()+1).toString(); //January is 0!
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