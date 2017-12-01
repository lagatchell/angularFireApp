import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'rent-info-dialog',
    template: `
        <h1 mat-dialog-title>{{data.title}}</h1>
        <div mat-dialog-content>
            <label>Duration: {{data.duration}} minutes</label>
            <br />
            <label>Description:</label>
            <br />
            <p>
                {{data.description}}
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
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { 

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    
    return(movie) {
        movie.return(movie);
        this.onNoClick();
    }

  }