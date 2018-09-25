import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent  {

  // lastname: string;
  // firstname: string;
  email: string;
  password: string;
  invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  log(x) {
    console.log(x);
  }

  submit(signinForm) {
    console.log( signinForm.value.signin );
    // The json that we can send to the API: signupForm.value
    this.authService.login(signinForm.value.signin)
      .subscribe(result => {
        console.log( 'RESULT' );
        console.log( result );
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }

}

