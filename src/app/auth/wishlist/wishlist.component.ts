// Angular
import { Component, OnInit, ViewChild } from '@angular/core';

// Material
import { 
    MatPaginator, 
    MatTableDataSource, 
    MatSort, 
    MatDialog,
    Sort 
} from '@angular/material';

// Injectables
import { WishlistEditDialog } from '../dialogs/wishlist-edit.dialog';

// Services
import { WishListService } from '../services/wishlist.service';

// Models
import { Movie } from '../models/movie';
import { WishlistMovie } from '../models/wishlist-movie';
 
// Other
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './wishlist.component.html', 
    styleUrls: ['./wishlist.component.css']
})

export class WishListComponent {

    displayedColumnKeys = ['imgURL', 'title'];
    displayedColumns = [
        {
            id: 'imgURL',
            display: 'Poster',
            type: 'image'
        },
        {
            id: 'title',
            display: 'Title',
            type: 'string'
        }
    ];
    dataSource: MatTableDataSource<any>;
    movieIDs: string[];
    wishlistMovies: WishlistMovie[];

    constructor(
        public wishListService: WishListService,
        public dialog: MatDialog, 
    ) {}

    ngOnInit() {
        this.getWishlist();
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    getWishlist() {
        this.wishListService.getWishlist$().subscribe(wms => {
            this.dataSource = new MatTableDataSource<WishlistMovie>(wms);
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
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
