import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './password.validators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  constructor(
    private router: Router,
    private authService: AuthService) {
      this.invalidLogin = false;
    }

invalidLogin: boolean;


  signupForm = new FormGroup( {
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      // tslint:disable-next-line:quotemark
      Validators.pattern("[A-Za-z ']+")
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      // tslint:disable-next-line:quotemark
      Validators.pattern("[A-Za-z ']+")
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.email
     // UsernameValidators.shouldBeUnique
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      UsernameValidators.containsAtLeastADigit,
      UsernameValidators.containsAtLeastALowerCase,
      UsernameValidators.containsAtLeastAnUpperCase
    ]),
    isAdmin: new FormControl('')
  } );

  get isInvalid() {
    return this.invalidLogin;
  }

  get lastname() {
    return this.signupForm.get('lastname');
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  submitSignup() {
    console.log( this.signupForm.value );
   
    this.authService.register(this.signupForm.value )
    .subscribe(result => {
      if (result) {
        this.router.navigate(['/'], { queryParams: { signedUp: true } });
        console.log('LOGGUER');
        console.log(result);
        this.invalidLogin = false;
        //this.signupForm.errors.isInvalid = false;
      } else {
        console.log('INVALIDE');
        this.invalidLogin = true;
        //this.signupForm.errors.isInvalid = true;
      }
    });

    /*
    isValid = false; // authService.signup( this.signupForm.value );
   if (!isValid) {
     this.signupForm.setErrors({invalidLoginOrPassword: true});
   }*/
  }


}
