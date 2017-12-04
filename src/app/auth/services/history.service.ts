import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { RentedMovie } from '../models/rentedMovie';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

import { SnackBarComponent } from '../../shared/snackbar.component';

@Injectable()
export class HistoryService {

    moviesIDs: Observable<any[]>;

    constructor(
        public movieSVC: MovieService,
        public userSVC: UserService,
        public snackBar: SnackBarComponent,
        private readonly afd: AngularFireDatabase
    ) {}

    getHistoryMovieIDs$() {
        this.moviesIDs = this.afd.list('history/' + this.userSVC.authUser.uid).valueChanges();
        return this.moviesIDs;
    }

    addMovie(userID, movie, rentedMovieID) {
        const self = this;

        let rentedDate = this.getCurrentDate();
        
        let dbRef = firebase.database().ref('history/'+ userID);
        let rentedMovie = dbRef.push();
        rentedMovie.set ({
            movieId: movie.id,
            rentedDate: rentedDate,
            returnDate: "",
            id: rentedMovieID
        });

        self.snackBar.open(movie.title + ' been added to your history');
    }

    updateMovieHistory(userID, rentedMovieID) {
        
    }

    // Not sure if this should be implemented
    /* removeMovie(userID, movieID) {
        const self = this;

        let dbRef = firebase.database().ref('history/'+userID).child(movieID).remove();

        self.openSnackBar('Movie has been removed from history','');
    } */

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