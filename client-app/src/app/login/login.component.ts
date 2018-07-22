import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';

// import {Http}  from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userSV: UserService,
     private router: Router,
     private toastr: ToastrService
    ) { }
  user: IUser;
  email: String;
  password: String;
  ngOnInit() {


  }
  checkLogin() {
    this.userSV.checkLogin(this.email, this.password).subscribe(data => {
      if (!data.message) {
        localStorage.setItem('x', data.token);
        // console.log('token ne`  ', data.token);
        this.router.navigate(['./home']);
        this.toastr.success('Login Success !');
      } else {
        this.toastr.error('Login failed');
      }
    });
  }


}
