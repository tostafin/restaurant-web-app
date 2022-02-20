import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
  const password = control.get("password");
  const confirmedPassword = control.get("confirmedPassword");
  if (password?.value !== confirmedPassword?.value) {
    confirmedPassword?.setErrors({ notMatching: true });
    return { notMatching: true };
  }
  return null;
}

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective {

  constructor() {
  }

}
