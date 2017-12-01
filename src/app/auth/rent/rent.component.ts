import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog } from '@angular/material';

import { RentInfoDialog } from '../dialogs/rent-info.dialog';

import { Movie } from '../classes/movie';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { RentService } from '../services/rent.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './rent.component.html', 
    styleUrls: ['./rent.component.css']
})

export class RentComponent {
    movieIDs: any[];
    movies: Movie[];
    user: any;
    rentedMovieKey: any;
    loading: boolean = true;

    constructor(
        public userSVC: UserService,
        public rentSVC: RentService,
        public movieSVC: MovieService,
        public dialog: MatDialog
    ){
        this.movies = [];
        this.movieIDs = [];
        this.rentedMovieKey = {};
    }

    ngOnInit(){
        this.user = this.userSVC.authUser;
        this.getRentedMovieIDs();
    }

    getRentedMovieIDs() {
        const self = this;
        let sub = this.rentSVC.getRentedMovieIDs$().subscribe(movieIDs => {
            if (movieIDs.length > 0) {
                self.movieIDs = movieIDs;
                self.getRentedMovies(self);
            }
            else {
                self.loading = false;
                self.movies = [];
                self.rentedMovieKey = {};
            }
            //sub.unsubscribe();
        });
    }

    getRentedMovies(self) {
        self.movies = [];
        for(let i=0, len=self.movieIDs.length; i<len; i++)
        {
            let sub = self.movieSVC.getMovieById$(self.movieIDs[i].movieId).subscribe(rentedMovie => {
                self.movies.push(rentedMovie);
                self.rentedMovieKey[rentedMovie.id] = self.movieIDs[i].id;
                self.loading = false;
                sub.unsubscribe();
            });
        }
    }

    info(movie: Movie): void {
        const self = this;
        let dialogRef = this.dialog.open(RentInfoDialog, {
            height: '400px',
            width: '600px',
            data: { 
                title: movie.title, 
                description: movie.shortDescription,
                duration: movie.duration,
                id: movie.id,
                return: function(movieData){

                    let returnMovie = {
                        title: movieData.title,
                        shortDescription: movieData.shortDescription,
                        duration: movieData.duration,
                        id: movieData.id
                    };

                    let rentedKey = self.rentedMovieKey[movie.id];
                    self.rentSVC.returnMovie(self.user.uid, rentedKey, returnMovie);
                }
            }
        });
    }
}