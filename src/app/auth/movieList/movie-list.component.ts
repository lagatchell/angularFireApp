import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material';

import { MovieInfoDialog } from '../dialogs/movie-info.dialog';

import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { Movie } from '../classes/movie';

import { Observable } from 'rxjs';

@Component({
    templateUrl: './movie-list.component.html', 
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {
    
    movies: Movie[];
    user: any;
    loading: boolean = true;
    colSize: number = 5;

    constructor(
        public movieSVC: MovieService,
        public userSVC: UserService,
        public dialog: MatDialog
    ){
        this.movies = new Array<Movie>();
    }

    ngOnInit(){
        this.user = this.userSVC.authUser;
        this.getMovies();
        this.onResize({
            target: window
        });
    }

    getMovies() {
        const self = this;
        let sub = this.movieSVC.getMovies$().subscribe(movies => {
            self.movies = movies;
            self.loading = false;
        });
    }

    info(movie: Movie): void {
        let dialogRef = this.dialog.open(MovieInfoDialog, {
            height: '400px',
            width: '600px',
            data: { 
                title: movie.title, 
                description: movie.shortDescription,
                duration: movie.duration,
                rating: movie.rating,
                id: movie.id
            }
        });
    }

    onResize(event) {
        const elementWidth = event.target.innerWidth;

        if (elementWidth < 460) {
            this.colSize = 1;
        }

        if (elementWidth < 580 && elementWidth >= 460) {
            this.colSize = 2;
        }

        if (elementWidth < 780 && elementWidth >= 580) {
            this.colSize = 3;
        }

        if (elementWidth < 993 && elementWidth >= 780) {
            this.colSize = 4;
        }

        if (elementWidth > 993) {
            this.colSize = 5;
        }
    }
}
