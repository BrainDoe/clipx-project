import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchControl = group.get(matchingControlName);
  
      if(!control || !matchControl) {
        console.error('Form controls cannot be found in the form group');
        return { controlNotFound: false }
      }
  
      const error = control.value === matchControl.value ? null : { noMatch: true }

      matchControl.setErrors(error); //Set the error to the confirmPassword field. You will need to manually remove the error when the field becomes valid since angular is no longer in charge after manually setting the error to a field using the setErrors() function
  
      return error;
    }
  }
}
