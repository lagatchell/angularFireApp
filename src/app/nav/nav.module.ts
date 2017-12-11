// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Components
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    NavComponent
  ],
  providers: [],
  bootstrap: [NavComponent]
})

export class NavModule { }