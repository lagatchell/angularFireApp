import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
                {{data.description}}
            </p>

        </div>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()" tabindex="-1">Close</button>
            <button mat-raised-button color="primary" (click)="rent(data)" tabindex="-1" >Rent</button>
            <button mat-raised-button color="accent" (click)="addToFavorites(data);" tabindex="-1">Add to Wishlist</button>
        </div>
    `,
  })

  export class MovieInfoDialog {
  user: any;

    constructor(
        public dialogRef: MatDialogRef<MovieInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public wishlistSVC: WishListService,
        public rentSVC: RentService,
        public userSVC: UserService,
    ) { }

    ngOnInit(){
        this.user = this.userSVC.authUser;
    }

    rent(movie) {
        this.userSVC.verifyLogin();
        if(this.userSVC.loggedInUser) {
            this.rentSVC.rentMovie(this.user.uid, movie);
        }
        else {
            this.onNoClick();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addToFavorites(movie) {
        this.wishlistSVC.addMovie(this.user.uid, movie);
    }
  
  }