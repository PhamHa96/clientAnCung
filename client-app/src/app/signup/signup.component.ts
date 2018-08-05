import { IUser } from './../models/IUser';
import { Component, OnInit } from '@angular/core';
import { SignupService } from '../providers/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fistName = '';
  lastName = '';
  confirmPassword = '';
  messErr = '';
  user: IUser = {
    email: '',
    password: '',
    phone: '',
    sex: 'female'
  };
  constructor(private _signup: SignupService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  checkValue() {
    if (this.fistName === '') {
      this.messErr = 'Please fill your first name! ';
    }
    if (this.lastName === '') {
      this.messErr = 'Please fill your last name! ';
    }
    if (this.user.email === '') {
      this.messErr = 'Please fill your email! ';
    }
    if (this.user.password === '') {
      this.messErr = 'Please fill your password! ';
    }
    if (this.confirmPassword === '') {
      this.messErr = 'Please fill your confirmPassword! ';
    }
    if (this.user.phone === '') {
      this.messErr = 'Please fill your phone! ';
    }
    if (this.user.sex === '') {
      this.messErr = 'Please choose your sex! ';
    } else {
      this.messErr = '';
    }
  }
  signUp() {
    this.checkValue();
    if (this.messErr === '') {
      this.user.name = this.fistName + ' ' + this.lastName;
      this._signup.signUp(this.user).subscribe(data => {
        if (data) {
          if (data.statusCode === 404) {
            this.toastr.error('Email is existed !');
          } else {
            this.toastr.success('Sign up success !');
          }
           console.log('data sign up---> ', data );
        } else {
          this.toastr.error('Failed');
        }
      });
    } else {
      this.toastr.error(this.messErr);
    }
  }
}
