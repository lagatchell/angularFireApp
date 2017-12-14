// Angular
import { Component } from '@angular/core';

// Services
import { MovieService } from '../services/movie.service';

// Models
import { Movie } from '../models/movie';
import { FormGroup } from '@angular/forms/src/model';

@Component({
    templateUrl: './create-movie.component.html', 
    styleUrls: ['./create-movie.component.css']
})

export class CreateMovieComponent {

    movieTitle: string;
    movieDescription: string;
    movieDuration: string;
    movieRating: number = 1;
    movieImgTitle: string;
    movieImg: any;
    moviePosterInput: HTMLInputElement;
    invalidUpload: boolean;

    constructor(
        public movieService: MovieService
    ){}

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        let fileType = file.name.split('.')[1];

        if(fileType.toLowerCase() == "png" || fileType.toLowerCase() == "jpg")
        {
            this.invalidUpload = false;
            this.movieImgTitle = file.name; 
            myReader.readAsDataURL(file);

            myReader.onload = (e: any) => {
                console.log(e.target);
                this.movieImg = e.target.result;
            }
        }
        else {
            this.invalidUpload = true;
            $event.target.value = "";
        }
    }

    create() {
        let newMovie: Movie = new Movie(
            this.movieTitle, 
            this.movieDescription, 
            this.movieDuration, 
            this.movieRating,
            this.movieTitle, 
            this.movieImg
        );

        try {
            this.movieService.createMovie(newMovie);
            this.movieTitle = "";
            this.movieImg = null;
            this.moviePosterInput.value = "";
        } catch(e)
        {
            console.log(e.message);
        }
        
    }

}