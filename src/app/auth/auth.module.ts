// Angular Modules
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

// App Modules
import { NavModule } from '../nav/nav.module';
import { MaterialDesignModule } from '../shared/mat.module';

// Firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';

// App Services
import { UserService } from './services/user.service';
import { MovieService } from './services/movie.service';
import { RentService } from './services/rent.service';
import { WishListService } from './services/wishlist.service';
import { HistoryService } from './services/history.service';

// App Components
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent} from './movieList/movie-list.component';
import { RentComponent } from './rent/rent.component';
import { HistoryComponent } from './history/history.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateMovieComponent } from './createMovie/create-movie.component';

import { StarComponent } from '../shared/rating/star.component';
import { SnackBarComponent } from '../shared/snackbar.component';

// App Dialogs
import { MovieInfoDialog } from './dialogs/movie-info.dialog';
import { RentInfoDialog } from './dialogs/rent-info.dialog';
import { WishlistEditDialog } from './dialogs/wishlist-edit.dialog';

const AuthRoutes: Routes = [
    { 
        path: 'auth',  
        component: AuthComponent, 
        children: [
            { path: 'wishlist', component: WishListComponent, canActivate: [UserService] },
            { path: 'history', component: HistoryComponent, canActivate: [UserService] },
            { path: 'rentals', component: RentComponent, canActivate: [UserService] },
            { path: 'create', component: CreateMovieComponent, canActivate: [UserService] },
            { path: 'profile', component: ProfileComponent, canActivate: [UserService] },
            { path: 'movies', component: MovieListComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'login', component: LoginComponent },
            { path: '', component: LoginComponent}
        ]
    },
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterModule.forChild(AuthRoutes),
        NavModule,
        MaterialDesignModule
    ],
    exports: [
        RouterModule       
    ],
    declarations: [
        AuthComponent,
        SignUpComponent,
        LoginComponent,
        ProfileComponent,
        CreateMovieComponent,
        MovieListComponent,
        RentComponent,
        HistoryComponent,
        WishListComponent,
        StarComponent,
        SnackBarComponent,
        MovieInfoDialog,
        RentInfoDialog,
        WishlistEditDialog
    ],
    entryComponents: [
        MovieInfoDialog,
        RentInfoDialog,
        WishlistEditDialog
    ],
    providers: [
        UserService,
        MovieService,
        RentService,
        WishListService,
        HistoryService,
        SnackBarComponent
    ]
})
export class AuthModule {}