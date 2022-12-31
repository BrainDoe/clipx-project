import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) { }
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created!';
  alertColor = 'blue';
  inSubmission = false;

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

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created!';
    this.alertColor = 'blue';
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(email as string, password as string);
      
      await this.db.collection('user').add({
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        age: this.age.value
      })
    } catch (error) {
      console.error(error);
      this.alertMsg = 'Error occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Succes! Your account has been created.';
    this.alertColor = 'green';
  }

}
