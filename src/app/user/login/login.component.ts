import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  credentials = {
    email: '',
    password: ''
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.credentials);
  }
  // { "compilerOptions": { "skipLibCheck": true, } }
}
