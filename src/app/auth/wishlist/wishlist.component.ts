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
import { Movie } from '../models/movie';
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
        this.getWishlist();
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    getWishlist() {
        this.wishlistSVC.getWishlist$().subscribe(wms => {
            this.dataSource = new MatTableDataSource<any>(wms);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    edit(row) {
        const self = this;
        let dialogRef = this.dialog.open(WishlistEditDialog, {
            height: '150px',
            width: '350px',
            data: row
        });
    }

    applyFilter(filterValue: string)
    {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
