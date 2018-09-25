import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  private url: string = environment.urls.tenants;

  constructor(private http: HttpClient, private auth: AuthService) { }


  readTenants() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.get(this.url, httpOptions)  ;
  }

  createTenant( tenant ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.post(this.url , JSON.stringify(tenant) , httpOptions);
  }

  updateTenant(tenant) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.put(this.url + '/' + tenant._id, JSON.stringify(tenant) );
  }

  patchTenant(tenant) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.patch(this.url + '/' + tenant._id, JSON.stringify(tenant) );
  }

  deleteTenant(tenant) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.delete(this.url + '/' + tenant._id, httpOptions);
  } // .pipe( catchError

  getAll() {
    return [
      {
        _id: '1',
        lastname: 'FOATA',
        firstname: 'Nicolas',
        email: 'nicolas.foata@gmail.com',

        avatar_url: 'https://avatars3.githubusercontent.com/u/10586972?v=4'
      },
      {
        _id: '2',
        lastname: 'TAQUET',
        firstname: 'Nathalie',
        email: 'nath.taquet@gmail.com',
        avatar_url: 'https://avatars2.githubusercontent.com/u/5821497?v=4'
      }
    ];
  }
}
