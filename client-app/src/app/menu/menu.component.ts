import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../providers/login.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // isLogin = new BehaviorSubject<Boolean>(false);
  isInLogin = false ;
  user: IUser;
  constructor(private userService: UserService, private _login: LoginService, private router: Router) {
  }

  ngOnInit() {
    // this._login.IsLogin.subscribe(value => {
    //   this.isLogin = value;
    // });

    //   if (localStorage.getItem('token') || localStorage.getItem('tokenS')) {
    //     this.isLogin = true;
    //   } else {
    //     this.isLogin = false;
    //     localStorage.removeItem('email');
    //     localStorage.removeItem('isLogin');
    //     localStorage.removeItem('local_login');
    //     this.router.navigateByUrl('/login');

    //   }
    //   console.log('local login ' + this.isLogin);
    // }
    const checkToken =  localStorage.getItem('x');
    if (checkToken) {
      this.isInLogin = true ;
    }
    this.userService.getUserByToken()
      .subscribe(user => {
        console.log('user info' , user.name);
        this.user = user;
        if (user) {
          this.isInLogin = true;
        }
      });
  }
}
