// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    AppRoutingModule,
    NavModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
