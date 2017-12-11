// Angular
import { Component, OnInit, Inject } from '@angular/core';

// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { UserService } from '../services/user.service';
import { RentService } from '../services/rent.service';
import { WishListService } from '../services/wishlist.service';

@Component({
    selector: 'info-dialog',
    template: `
        <h1 mat-dialog-title>{{data.title}}</h1>
        <div mat-dialog-content>
            <label>Duration: {{data.duration}} minutes</label>
            <br />
            <label>Rating: <ai-star [rating]="data.rating"></ai-star></label>
            <br />
            <label>Description:</label>
            <br />
            <p>
                {{data.shortDescription}}
            </p>

        </div>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()" tabindex="-1">Close</button>
            <button mat-raised-button color="primary" (click)="rent(data)" tabindex="-1" >Rent</button>
            <button *ngIf="userService.authUser" mat-raised-button color="accent" (click)="addToWishlist(data);" tabindex="-1">Add to Wishlist</button>
        </div>
    `,
  })

  export class MovieInfoDialog {

    constructor(
        public dialogRef: MatDialogRef<MovieInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public wishListService: WishListService,
        public rentService: RentService,
        public userService: UserService,
    ) {}

    rent(movie) {
        this.userService.verifyLogin();
        if(this.userService.loggedInUser) {
            this.rentService.rentMovie(movie);
        }
        else {
            this.onNoClick();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addToWishlist(movie) {
        this.wishListService.addMovie(movie);
    }
  
  }