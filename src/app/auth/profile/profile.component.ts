// Angular
import { Component, ViewChild, OnInit } from '@angular/core';

// Material
import { MatPaginator, MatTableDataSource, Sort } from '@angular/material';

// Services
import { UserService } from '../services/user.service';

// Models
import { User } from '../models/user';

@Component({
    templateUrl: './profile.component.html', 
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    authUser: any;
    userDisplayName: string;
    userEmail: string;
    userPassword: string;
    profilePicTitle: string;
    profilePic: any;
    invalidUpload: boolean;

    constructor(private userService: UserService)
    {
        this.authUser = this.userService.authUser;
        this.userDisplayName = this.authUser.displayName;
        this.userEmail = this.authUser.email;
        this.profilePic = this.authUser.photoURL;
    }

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        let fileType = file.name.split('.')[1];

        if(fileType.toLowerCase() == "png" || fileType.toLowerCase() == "jpg")
        {
            this.invalidUpload = false;
            this.profilePicTitle = file.name; 
            myReader.readAsDataURL(file);

            myReader.onload = (e: any) => {
                this.profilePic = e.target.result;
            }
        }
        else {
            this.invalidUpload = true;
            $event.target.value = "";
        }
    }
    
    updateUser() {

        let updatedUser: User = {
            displayName: this.userDisplayName,
            email: this.userEmail,
            photoURL: this.profilePic,
            id: this.authUser.uid
        }

        this.userService.updateUser(updatedUser, this.userPassword);
    }
}
