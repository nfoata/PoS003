import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private url: string = environment.urls.prices;

  constructor(private http: HttpClient, private auth: AuthService) { }

  public get(url: string): Observable<any> {
    /*const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };*/
    return this.http.get(url);
  }

  getPrices() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    //const token = this.auth.getToken();
    return this.http.get(this.url, httpOptions)  ;
    /*return this.http.get(this.url,
      {
        headers: new Headers(['x-auth-token:' + token])
      }
    )  ;*/
  }

  postPrice( price ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': this.auth.getToken()
      })
    };
    return this.http.post(this.url , JSON.stringify(price) , httpOptions);
  }

  updatePost(price) {
    return this.http.put(this.url + '/' + price.id, JSON.stringify(price) );
  }

  patchPost(price) {
    return this.http.patch(this.url + '/' + price.id, JSON.stringify(price) );
  }

  deletePost(price) {
    return this.http.delete(this.url + '/' + price.id);
  }// .pipe( catchError

}
