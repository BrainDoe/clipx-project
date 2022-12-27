import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor() { }
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created!';
  alertColor = 'blue';

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmPassword = new FormControl('', [Validators.required])
  phoneNumber = new FormControl('', [
    Validators.required
  ]);
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)])

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
    age: this.age,
  });

  register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created!';
    this.alertColor = 'blue';
  }

}
