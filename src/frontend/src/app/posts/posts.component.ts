import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private service: PostService) {
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        response => {
        this.posts = response.json();
        console.log(this.posts[0]);
      }, error => {
        console.error('an error occured');
      });
  }

  sendPost( input: HTMLInputElement ) {
    const post = { title: input.value };
    input.value = '';
    this.service.postPost(post)
    .subscribe( response => {
      console.log( response.json() );
      post['id'] =  response.json().id;
      this.posts.splice(0, 0, post);
    },
    (error: Response) => {
      if ( error.status === 400) {
        alert('This entry has already been found (already deleted?)');
       // this.form.setErrors = errors.json();
      } else {
        alert('An error occured');
      }
      // console.error('an error occured')
    });
    console.log(post);
  }

  sendPut( post ) {
    /*console.log("put");
    this.http.patch( this.url, JSON.stringify(input) )
    .subscribe( response => {
      console.log("put response");
      console.log( response.json() );
    });*/

    console.log('patch');
    this.service.patchPost( { id: post.id, isRead: true} )
    .subscribe( response => {
      console.log('patch response');
      console.log( response.json() );
    });
  }

  sendDelete( post ) {
    console.log('delete');
    this.service.deletePost(post.id)
    .subscribe(
      response => {
      console.log('patch response');
      console.log( response.json() );
      const index = this.posts.indexOf( post.id);
      this.posts.splice(index, 1);
    },
    (error: Response) => {
      if ( error.status === 404) {
        alert('This entry has already been found (already deleted?)');
      } else {
        alert('An error occured');
      }
      // console.error('an error occured')
    });
  }

}
