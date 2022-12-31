import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showAlert = false;
  alertMsg = 'Please wait! You are being logged in...';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) { }

  credentials = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are being logged in...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      console.log(this.credentials);
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (error) {
      console.error(error);
      this.alertMsg = 'Error occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      console.log(error);
      return;
    }

    this.alertMsg = 'Success! You are now logged in';
    this.alertColor = 'green';
  }
}
