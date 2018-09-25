import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; //https://www.npmjs.com/package/@auth0/angular-jwt
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  currentUser: any;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelperService();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log('credentials'); console.log(credentials);
    return this.http.post(
     environment.urls.authentication,
     // 'http://192.168.0.107:2802/api/v1/auths',
      JSON.stringify(credentials),
      httpOptions )
      .pipe( map( (response ) => {
      console.log('Authentication response =>');
      console.log(response);
      const result = JSON.parse(JSON.stringify(response));
      // const result = (<Response>response).json();
      if (result && result.token) {
        console.log('Authentication token =>');
        console.log(result);
        localStorage.setItem('token', result.token);
        const jwt = new JwtHelperService();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      } else {
        return false;
      }
    })
   );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('my.firstname');
    localStorage.removeItem('my.lastname');
    localStorage.removeItem('my.email');
    this.currentUser = null;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelperService();
      return jwt.isTokenExpired(token);
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(personalData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log('Personal data'); console.log(personalData);
   return this.http.post(
     environment.urls.registration,
    // 'http://192.168.0.107:2802/api/v1/tenants',
      JSON.stringify(personalData),
      httpOptions )
   .pipe(
    map( (response ) => {
      console.log('Registration =>');
      console.log(response);
      const result = JSON.parse(JSON.stringify(response));
      if (result && result._id) {
        localStorage.setItem('my._id', result._id);
        localStorage.setItem('my.firstname', result.firstname);
        localStorage.setItem('my.lastname', result.lastname);
        localStorage.setItem('my.email', result.email);
        return true;
      } else {
        return false;
      }
    })
   );
  }
}

