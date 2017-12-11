// Angular
import { Component, OnInit, Inject} from '@angular/core';

// Material
import { MatDialog } from '@angular/material';

// Injectables
import { RentInfoDialog } from '../dialogs/rent-info.dialog';

// Services
import { UserService } from '../services/user.service';
import { RentService } from '../services/rent.service';

// Models
import { Movie } from '../models/movie';

// Other
import { Observable } from 'rxjs';

@Component({
    templateUrl: './rent.component.html', 
    styleUrls: ['./rent.component.css']
})

export class RentComponent {
    movies: Movie[];
    rentedMovieKey: any;
    loading: boolean = true;
    colSize: number = 5;

    constructor(
        public rentService: RentService,
        public dialog: MatDialog
    ){
        this.movies = [];
        this.rentedMovieKey = {};
    }

    ngOnInit(){
        this.getRentedMovies();
        this.onResize({
            target: window
        });
    }

    getRentedMovies() {
        this.rentService.getRentedMovies$().subscribe(rms => {
            this.movies = [];
            this.rentedMovieKey = {};
            for (let i = 0; i < rms.length; i++) {
                this.movies.push(rms[i].movie);
                this.rentedMovieKey[rms[i].movie.id] = rms[i].rentedMovie.id;
            }
            this.loading = false;
        });
    }

    info(movie: Movie): void {
        const self = this;
        let dialogRef = this.dialog.open(RentInfoDialog, {
            height: '400px',
            width: '600px',
            data: { 
                movie: movie,
                rentedKey: self.rentedMovieKey[movie.id]
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