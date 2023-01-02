import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchControl = group.get(matchingControlName);
  
      if(!control || !matchControl) {
        return { controlNotFound: false }
      }
  
      const error = control.value === matchControl.value ? null : { noMatch: true }
  
      return error;
    }
  }
}
