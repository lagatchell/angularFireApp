import { Component } from '@angular/core';

import { MovieService } from '../services/movie.service';
import { Movie } from '../classes/movie';

@Component({
    templateUrl: './create-movie.component.html', 
    styleUrls: ['./create-movie.component.css']
})

export class CreateMovieComponent {

    movieTitle: string;
    movieDescription: string;
    movieDuration: string;
    movieImgTitle: string;
    movieImg: any;
    invalidUpload: boolean;
    isReset: boolean = false;

    constructor(
        public movieSVC: MovieService
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
            this.movieTitle, 
            this.movieImg
        );

        try {
            this.movieSVC.createMovie(newMovie);

            this.movieTitle = null;
            this.movieDescription = null;
            this.movieDuration = null;
            this.movieTitle = null;
            this.movieImg = null;
            this.isReset = true;
        } catch(e)
        {
            console.log(e.message);
        }
        
    }

}