import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // isAuthenticated = false;

  constructor(public modal: ModalService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  openModal($event: Event): void {
    $event.preventDefault();

    this.modal.toggleModal('auth');
  }

  // logout($event: Event) {
  //   this.auth.logout($event);
  // }

}
