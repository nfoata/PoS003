import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';
//import { Observable } from'rxjs/Observable';
//import  'rxjs/add/operator/catch';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type:': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  

  private url: string = "http://jsonplaceholder.typicode.com/posts";

  constructor(private http: Http) {
  }

  getPosts() {
    return this.http.get(this.url);
  }

  postPost( post ) {
    return this.http.post(this.url , JSON.stringify(post) );
  }

  updatePost(post) {
    return this.http.put(this.url +'/' +post.id, JSON.stringify(post) );
  }

  patchPost(post) {
    return this.http.patch(this.url +'/' +post.id, JSON.stringify(post) );
  }

  deletePost(id){
    return this.http.delete(this.url +'/' +id);
  }//.pipe( catchError
}
