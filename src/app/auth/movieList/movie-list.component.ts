// Angular
import { Component, OnInit } from '@angular/core';

// Material
import { MatDialog } from '@angular/material';

// Injectables
import { MovieInfoDialog } from '../dialogs/movie-info.dialog';

// Services
import { MovieService } from '../services/movie.service';

// Models
import { Movie } from '../models/movie';

// Other
import { Observable } from 'rxjs';

@Component({
    templateUrl: './movie-list.component.html', 
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {
    
    movies: Movie[];
    loading: boolean = true;
    colSize: number = 5;

    constructor(
        public movieService: MovieService,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.getMovies();
        this.onResize({
            target: window
        });
    }

    getMovies() {
        this.movieService.getMovies$().subscribe(movies => {
            this.movies = movies;
            this.loading = false;
        });
    }

    info(movie: Movie): void {
        let dialogRef = this.dialog.open(MovieInfoDialog, {
            height: '400px',
            width: '600px',
            data: movie
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
