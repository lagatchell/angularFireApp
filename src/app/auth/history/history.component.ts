import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';

import { UserService } from '../services/user.service';
import { HistoryService } from '../services/history.service';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { RentedMovie } from '../models/rentedMovie';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './history.component.html', 
    styleUrls: ['./history.component.css']
})

export class HistoryComponent {
    authUser: any;
    displayName: string;
    displayedColumnKeys = ['title', 'rentedDate', 'returnDate'];
    displayedColumns = [
        {
            id: 'title',
            display: 'Title'
        },
        {
            id: 'rentedDate',
            display: 'Rented Date'
        },
        {
            id: 'returnDate',
            display: 'Returned Date'
        }
    ];
    dataSource: MatTableDataSource<RentedMovie>;
    movieIDs: any[];
    historyMovies: RentedMovie[];

    constructor(
        private userSVC: UserService, 
        public historySVC: HistoryService, 
        public movieSVC: MovieService
    ) {
        this.authUser = this.userSVC.authUser;
        this.historyMovies = new Array<RentedMovie>();
        this.movieIDs = new Array<any>();
    }

    ngOnInit() {
        this.getRentHistory();
    }

    ngAfterViewInit() {
        if(this.dataSource != undefined)
        {
            this.dataSource.sort = this.sort;
        }
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    getRentHistory() {
        this.historySVC.getRentHistory$().subscribe(hms => {
            this.dataSource = new MatTableDataSource<RentedMovie>(hms);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string)
    {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
