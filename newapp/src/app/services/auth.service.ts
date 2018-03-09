import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //working with observables
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;  //type any 
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
           .map(res => res.json());
  }
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
           .map(res => res.json());
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken) //sending the token to the enpoint
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
           .map(res => res.json());

  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken(){
    const token  = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn(){
    return tokenNotExpired('id_token');
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

//Now that I have creted this service, I need to make reference to it in the app.module
//By importing the service to app.module and referencing it in the providers.