import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggleActive: boolean = false;
  toggleAddUser: boolean = true;
  toggleEditUser = [];
  toggleSaveUser = [];

  constructor(private router: Router, private userService: UserService) { }

  users: Object

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  toggle(){
    this.toggleActive = !this.toggleActive;
    
  }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  toggleAdd(){
    this.toggleAddUser = !this.toggleAddUser;
  }

  toggleEdit(index) {
    this.toggleEditUser[index] = true;
  }

  toggleSave(index, user){
    

    this.userService.updateUser(user).subscribe(data => {
      this.getAllUsers();
      this.toggleEditUser[index] = false;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }
  onSubmit(user){
    this.userService.addUser(user).subscribe(data => {
      this.getAllUsers();
      this.toggleAddUser = true;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }

  DeleteUser(userId){
    this.userService.deleteUser(userId).subscribe(data => {
      this.getAllUsers();
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    })
  }
  
}
