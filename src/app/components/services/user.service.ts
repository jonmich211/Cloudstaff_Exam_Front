import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl:String = 'http://localhost:3600';
  constructor(private http: HttpClient) { }

  userAuthentication(email,password){
    const data = {
      email,
      password
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json' , 'No-Auth': 'True'});
    return this.http.post(`${this.rootUrl}/auth/signin`, data, {headers} )

  }


  getAllUsers(){
    return this.http.get(`${this.rootUrl}/users/getAllUsers`);
  }

  addUser(user) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.rootUrl}/users/register`, user, {headers})
  }


  deleteUser(userId){
    return this.http.delete(`${this.rootUrl}/users/deleteUserById/${userId}`)
  }

  updateUser(user) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(`${this.rootUrl}/users/updateUserbyId/${user._id}`, user, {headers})
  }
}
