// Angular
import { Component, OnInit, ViewChild } from '@angular/core';

// Material
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';

// Services
import { HistoryService } from '../services/history.service';

// Models
import { Movie } from '../models/movie';
import { RentedMovie } from '../models/rented-movie';

// Other
import { Observable } from 'rxjs';

@Component({
    templateUrl: './history.component.html', 
    styleUrls: ['./history.component.css']
})

export class HistoryComponent {
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
    historyMovies: RentedMovie[];

    constructor(
        public historyService: HistoryService
    ) {}

    ngOnInit() {
        this.getRentHistory();
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    getRentHistory() {
        this.historyService.getRentHistory$().subscribe(hms => {
            this.dataSource = new MatTableDataSource<RentedMovie>(hms);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string)
    {
        filterValue = filterValue.trim(); 
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }
}
