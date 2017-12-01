import { Component, OnInit, ViewChild } from '@angular/core';
import { 
    MatPaginator, 
    MatTableDataSource, 
    MatSort, 
    MatDialog,
    Sort 
} from '@angular/material';

import { WishlistEditDialog } from '../dialogs/wishlist-edit.dialog';

import { UserService } from '../services/user.service';
import { WishListService } from '../services/wishlist.service';
import { MovieService } from '../services/movie.service';
import { Movie } from '../classes/movie';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './wishlist.component.html', 
    styleUrls: ['./wishlist.component.css']
})

export class WishListComponent {

    authUser: any;
    displayedColumnKeys = ['title'];
    displayedColumns = [
        {
            id: 'title',
            display: 'Title'
        }
    ];
    dataSource: MatTableDataSource<any>;
    movieIDs: any[];
    wishlistMovies: any[];

    constructor(
        private userSVC: UserService, 
        public wishlistSVC: WishListService, 
        public dialog: MatDialog, 
        public movieSVC: MovieService)
    { 
        this.authUser = this.userSVC.authUser;
        this.wishlistMovies = new Array<any>();
        this.movieIDs = new Array<any>();
    }

    ngOnInit() {
        this.getWishlistMovieIDs();
    }

    ngAfterViewInit() {
        if(this.dataSource != undefined)
        {
            this.dataSource.sort = this.sort;
        }
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    getWishlistMovieIDs() {
        const self = this;
        this.wishlistSVC.getWishlistMovieIDs$().subscribe(movieIDs => {
            if (movieIDs.length > 0) {
                self.movieIDs = movieIDs;
                self.getWishlist(self)
                    .then(function(){
                        self.dataSource = new MatTableDataSource<any>(self.wishlistMovies);
                        self.dataSource.sort = self.sort;
                        self.dataSource.paginator = self.paginator;
                    });
            }
        });
    }

    getWishlist(self) {
        self.wishlistMovies = [];
        return new Promise(function(resolve, reject) {
            for(let i=0, len=self.movieIDs.length; i<len; i++)
            {       
                let sub = self.movieSVC.getMovieById$(self.movieIDs[i].movieId).subscribe(movie => {
                    let wishlistMovie: any = {
                        title: movie.title,
                        movieId: movie.id,
                        id: self.movieIDs[i].id
                    };
                    self.wishlistMovies.push(wishlistMovie);
                    sub.unsubscribe();
                    if(i == (self.movieIDs.length -1))
                    {
                        resolve();
                    }
                })
            }
        });
    }

    edit(row) {
        const self = this;
        let dialogRef = this.dialog.open(WishlistEditDialog, {
            height: '150px',
            width: '350px',
            data: { 
                title: row.title,
                movieId: row.movieId,
                id: row.id,
                remove: function(){
                    for(var i=0, len=self.dataSource.data.length; i<len; i++)
                    {
                        if(self.dataSource.data[i].id === row.id)
                        {
                            self.dataSource.data.splice(i, 1);
                            let newDataSource = self.dataSource.data;
                            self.dataSource = new MatTableDataSource<any>(newDataSource);
                        }
                    }
                }
            }
        });
    }

    applyFilter(filterValue: string)
    {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
