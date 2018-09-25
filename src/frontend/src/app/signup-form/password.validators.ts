import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {

    static containsAtLeastAnUpperCase(control: AbstractControl ): ValidationErrors  {
        if ( !(control.value as string).match(".*[A-Z].*") ) {
            return { containsAtLeastAnUpperCase : false};
        }
        return null;
    }

    static containsAtLeastALowerCase(control: AbstractControl ): ValidationErrors  {
        if ( !(control.value as string).match(".*[a-z].*") ) {
            return { containsAtLeastALowerCase : false};
        }
        return null;
    }

    static containsAtLeastADigit(control: AbstractControl ): ValidationErrors  {
        if ( !(control.value as string).match(".*[0-9].*") ) {
            return { containsAtLeastADigit : false};
        }
        return null;
    }

    static shouldBeUnique(control: AbstractControl ): Promise<ValidationErrors>  {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                if( (control.value as string) === 'Nicolas' )
                    reject("username already exists");
                else
                    resolve(null);
            }, 5000);
        });
    }
    
}