import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { HistoryService } from './history.service';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs/';

import { Movie } from '../models/movie';
import { SnackBarComponent } from '../../shared/snackbar.component';

@Injectable()
export class RentService {

    constructor(
        public snackBar: SnackBarComponent,
        public historySVC: HistoryService,
        public userSVC: UserService,
        public movieSVC: MovieService,
        private readonly afd: AngularFireDatabase
    ){}

    getRentedMovies$() {
        let rented: Observable<any> = this.afd.list('rented/' + this.userSVC.authUser.uid).valueChanges();
        let movies: Observable<Movie[]> = this.movieSVC.movies;

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
        let uniqueId = firebase.database().ref().child('rented/'+ this.userSVC.authUser.uid).push().key;

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

        newRecord['/rented/'+ this.userSVC.authUser.uid +'/'+ uniqueId] = rentMovieData;
        newRecord['/history/'+ this.userSVC.authUser.uid + '/' + uniqueId] = historyMovieData;

        firebase.database()
            .ref()
            .update(newRecord)
            .then(function(){
                self.snackBar.open(movie.title + ' has been added to your rentals');
            });
    }

    returnMovie(rentedKey, movie) {
        const self = this;
        this.afd.list('rented/'+this.userSVC.authUser.uid+"/"+rentedKey).remove();

        let dbRef2 = firebase.database().ref('history/'+this.userSVC.authUser.uid).child(rentedKey)
        .update({
            returnDate: self.getCurrentDate()
        });

        self.snackBar.open(movie.title + ' has been returned');
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
