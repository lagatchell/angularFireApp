import { NgModule } from '@angular/core';

import { 
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  } from '@angular/material';
  import {CdkTableModule} from '@angular/cdk/table';
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    exports: [
        BrowserAnimationsModule,
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule
    ]
})

export class MaterialDesignModule {

}