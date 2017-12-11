export class RentedMovie {
    constructor(
        public id?: string,
        public movieId?: string,
        public rentedDate?: string,
        public returnDate?: string,
        public title?: string
    ){}
}