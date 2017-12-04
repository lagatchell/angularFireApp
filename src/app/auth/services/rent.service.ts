import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { HistoryService } from './history.service';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs';

import { Movie } from '../models/movie';
import { SnackBarComponent } from '../../shared/snackbar.component';

@Injectable()
export class RentService {

    moviesIDs: Observable<any[]>;

    constructor(
        public snackBar: SnackBarComponent,
        public historySVC: HistoryService,
        public userSVC: UserService,
        public movieSVC: MovieService,
        private readonly afd: AngularFireDatabase
    ){}

    getRentedMovieIDs$() {
        this.moviesIDs = this.afd.list('rented/' + this.userSVC.authUser.uid).valueChanges();
        return this.moviesIDs;
    }

    rentMovie(userID, movie) {
        const self = this;
        let uniqueId = firebase.database().ref().child('rented/'+ userID).push().key;

        let rentMovieData = {
            movieId: movie.id,
            id: uniqueId
        };

        let historyMovieData = {
            movieId: movie.id,
            rentedDate: self.getCurrentDate(),
            returnDate: "",
            id: uniqueId
        }

        let newRecord = {};

        newRecord['/rented/'+ userID +'/'+ uniqueId] = rentMovieData;
        newRecord['/history/'+ userID + '/' + uniqueId] = historyMovieData;

        firebase.database().ref().update(newRecord);

        self.snackBar.open(movie.title + ' has been added to your rentals');
    }

    returnMovie(userID, rentedKey, movie) {
        const self = this;

        //let dbRef = firebase.database().ref('rented/'+userID).child(rentedKey).remove();

        this.afd.list('rented/'+userID+"/"+rentedKey).remove();

        let dbRef2 = firebase.database().ref('history/'+userID).child(rentedKey)
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
