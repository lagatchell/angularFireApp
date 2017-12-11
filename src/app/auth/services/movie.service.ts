// Angular
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

//Models
import { Movie } from '../models/movie';

// Injectables
import { SnackBarComponent } from '../../shared/snackbar.component';

// Other
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {

    movies: Observable<Movie[]>;

    constructor(
        public snackBar: SnackBarComponent,
        private readonly afd: AngularFireDatabase
    ){
        this.movies = this.afd.list<Movie>('movies').valueChanges();
    }

    getMovies$() {
        return this.movies;
    }

    createMovie(movie: Movie) {
        const self = this;
        let storageRef = firebase.storage().ref();
        storageRef.child(`images/${movie.imgTitle}`).putString(movie.imgURL, 'data_url')
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('movies/');
                let newMovie = dbRef.push();
                newMovie.set ({
                    title: movie.title,
                    duration: movie.duration,
                    rating: movie.rating,
                    shortDescription: movie.shortDescription,
                    imgTitle: movie.imgTitle,
                    imgURL: url,
                    id: newMovie.key
                });

                self.snackBar.open(movie.title + ' has been created');
            })
            .catch ((error)=>{
                this.snackBar.open(error.message);
            });
    }
}
