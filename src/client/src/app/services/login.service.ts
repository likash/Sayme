import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../Models/authUser';
import { User } from '../Models/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: User[];

  constructor(private http: HttpClient) { }
  private url = '/api/account';
  // token: string;


  postLogin(login: AuthUser) {
    return this.http.post(this.url + "/authorizate", login);

  }


  getToken(): string {
    return localStorage.getItem('token');
  }


}
