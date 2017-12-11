// Angular
import { Component, OnInit, Inject } from '@angular/core';

// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { WishListService } from '../services/wishlist.service';
import { RentService } from '../services/rent.service';

@Component({
    selector: 'edit-dialog',
    template: `
        <h1 mat-dialog-title>{{data.title}}</h1>
        <div mat-dialog-content>
        </div>
        <div mat-dialog-actions>
            <button type="button" mat-raised-button (click)="onNoClick()" tabindex="-1">Close</button>
            <button type="button" mat-raised-button color="accent" (click)="rent(data)" tabindex="-1">Rent</button>
            <button type="button" mat-raised-button color="primary" (click)="remove(data)" tabindex="-1">Remove</button>
        </div>
    `,
  })

  export class WishlistEditDialog {

    constructor(
        public dialogRef: MatDialogRef<WishlistEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public wishListService: WishListService,
        public rentService: RentService
    ) { }

    remove(movie) {
        this.wishListService.removeMovie(movie);
        this.onNoClick();
    }

    rent(movie) {
        this.rentService.rentMovie({
            id: movie.movieId,
            title: movie.title
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
  
  }