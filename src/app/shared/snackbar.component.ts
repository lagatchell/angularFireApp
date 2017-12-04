import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
    template: ''
})

export class SnackBarComponent {

    constructor(
        public snackBar: MatSnackBar
    )
    {}

    open(message: string) {
        this.snackBar.open(message, '', {
            duration: 2000,
        });
    }
}

