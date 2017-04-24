import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { Router  } from '@angular/router';

import { User } from '../../Model/user.model';

@Component({  
  templateUrl: '../View/usermanagement.component.html', 
  providers: [ UserService ]
})
export class UserManagementComponent implements OnInit  {
   name: string;
   userName: string;
   password: string;
   confirmPassword: string;
   role: string;
   active: boolean;  
   errorMessage: string;

   isVisible:boolean = false;  

   editId: number = 0;
   editRole: string;
   editActive: boolean;

   public filterQuery = "";
   public rowsOnPage = 5;
   public sortBy = "role";
   public sortOrder = "asc";

   users: User[];

   constructor(private userService: UserService, private router: Router, private ref:ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getUsers();
    }

    toggle() {
        this.isVisible = !this.isVisible;
    }

    addUser() {
        let newUser = new User();
        newUser.name = this.name;
        newUser.userName = this.userName;
        newUser.password = this.password;
        newUser.role = this.role;
        newUser.active = true;

        this.userService.addNewUser(newUser).subscribe(
            response => {
                console.log('Created');               
            },
            err =>  console.log(err),
            () => this.getUsers()         
        );
    }

    getUsers() {
        this.userService.getUsers().subscribe(
            userList =>{ 
                
                if(userList != null) {
                        console.log(userList);
                        this.users = userList;
                        this.ref.detectChanges();
                }
            },
            err => console.log(err),
            () => console.log('request completed')
        );
    }

     edit(id: number) {
        this.editId = id;
    }

    updateUser(){
        this.userService.updateUser(this.editId, {role: this.editRole, active: this.editActive}).subscribe(
            response => {
                console.log('Updated');  
                this.editId = 0;             
            },
            err =>  console.log(err),
            () => this.getUsers()         
        );
    }
}