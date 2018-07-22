import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app AnCung';
  check: true;
  constructor(private router: Router) {
    const checkToken =  localStorage.getItem('x');
    console.log('token trong app', localStorage.getItem('x'));
    if (checkToken) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
