import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

import { SnackBarComponent } from '../../shared/snackbar.component';

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

    editMovie(update: Movie) {
        let dbRef = firebase.database().ref('movies/').child(update.id)
            .update({
                title: update.title,
                shortDescription: update.shortDescription,
                duration: update.duration,
                rating: update.rating
            });
        this.snackBar.open(update.title + ' has been updated');
    }

    removeMovie(deleteMovie: Movie){
        const self = this;
        let movieTitle = deleteMovie.title;
        let dbRef = firebase.database().ref('movies/').child(deleteMovie.id).remove();
        let imageRef = firebase.storage().ref().child(`images/${deleteMovie.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deleteMovie.imgTitle} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deleteMovie.imgTitle}`);
                });

        self.snackBar.open(movieTitle + ' has been deleted');
    }
}
