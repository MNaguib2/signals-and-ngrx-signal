import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../login-page.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private store: Store){}
  username: string = "";
  password: string = "";
  login(){
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}
