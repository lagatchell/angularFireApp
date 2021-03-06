// Angular
import { Component, OnInit, Inject} from '@angular/core';

// Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { RentService } from '../services/rent.service';

@Component({
    selector: 'rent-info-dialog',
    template: `
        <h1 mat-dialog-title>{{data.movie.title}}</h1>
        <div mat-dialog-content>
            <label>Duration: {{data.movie.duration}} minutes</label>
            <br />
            <label>Rating: <ai-star [rating]="data.movie.rating"></ai-star></label>
            <br />
            <label>Description:</label>
            <br />
            <p>
                {{data.movie.shortDescription}}
            </p>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()" tabindex="-1">Close</button>
            <button mat-raised-button color="primary" (click)="return(data);" tabindex="-1">Return</button>
        </div>
    `,
  })
  export class RentInfoDialog {

    constructor(
        public dialogRef: MatDialogRef<RentInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public rentService: RentService
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    return(data) {
        this.rentService.returnMovie(data.rentedKey, data.movie);
        this.onNoClick();
    }

  }