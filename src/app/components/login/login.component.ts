import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('userToken'));
    if (localStorage.getItem('userToken') !== null ) this.router.navigate(['/home'])
  }

  onSubmit(email,password){
    this.userService.userAuthentication(email,password).subscribe((data:any) => {
      
      const {token, success} = data;

      localStorage.setItem('userToken',token);
      if(success) this.router.navigate(['/home']);

      console.log(success);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
}
