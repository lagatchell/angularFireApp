// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './shared/app.routing';
import { NavModule } from './nav/nav.module';
import { MaterialDesignModule } from './shared/mat.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    NavModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
