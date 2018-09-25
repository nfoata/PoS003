import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Welcome to the Simple Front-end ';
  signedUp: boolean;

  constructor(private service: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = 'Welcome to the Simple Front-end ';
    this.route.queryParamMap.subscribe( params => {
      this.signedUp  = params.get('signedUp') === 'true';
      // const refresh = params.get('refresh') === 'true';
      console.log(  this.signedUp );
      if (this.signedUp) {
        this.title = 'Congratulations, you can sign-in, now ';
      } else {
        this.title = this.service.isLoggedIn() ?  'Secured Zone' : 'Welcome to the Simple Front-end ' ;
      }
    });
  }

}
