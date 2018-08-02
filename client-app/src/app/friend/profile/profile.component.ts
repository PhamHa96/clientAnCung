import { IUser } from './../../models/IUser';
import { UserService } from './../../providers/user.service';
import { StatesService } from './../../providers/state.service';
import { Component, OnInit } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm  } from '@angular/forms';
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
      console.log('user info' , user.name);
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
}
