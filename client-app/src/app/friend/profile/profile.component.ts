import { IUser } from './../../models/IUser';
import { UserService } from './../../providers/user.service';
import { StatesService } from './../../providers/state.service';
import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataUser: IUser[];
  usernow: IUser;
  idCheckFriend: '';
  keySearchFriend: '';
  constructor(private usersv: UserService, private toastr: ToastrService, private userStateService: StatesService) { }

  ngOnInit() {
    this.usersv.getUserByToken()
      .subscribe(user => {
        console.log('user info', user.name);
        this.usernow = user;
        this.idCheckFriend = user._id;
      });
  }

  search() {
    this.usersv.getUsertByNameOrEmail(this.keySearchFriend).subscribe(data => {
      this.dataUser = data;
      console.log('user tim dc >>>', this.dataUser);
    });
  }
  addFriend(id) {
      this.usersv.follow(id).subscribe(data => {
        console.log('data sign up---> ', data );
        if (data) {
            this.toastr.success('Follow success !');
        } else {
          this.toastr.error('Failed');
        }
      });
  }
}
