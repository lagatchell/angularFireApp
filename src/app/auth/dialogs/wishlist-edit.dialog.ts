import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../services/user.service';
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
  user: any;

    constructor(
        public dialogRef: MatDialogRef<WishlistEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public userSVC: UserService,
        public wishlistSVC: WishListService,
        public rentSVC: RentService
    ) { }

    ngOnInit(){
        this.user = this.userSVC.authUser;
    }

    remove(data) {
        this.wishlistSVC.removeMovie(this.user.uid, data.id, data.title);
        this.onNoClick();
    }

    rent(data) {
        this.rentSVC.rentMovie({
            title: data.title,
            id: data.movieId
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
  
  }