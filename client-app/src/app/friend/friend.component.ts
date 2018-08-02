import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  userNow: IUser;
  constructor(private usersv: UserService) { }

  ngOnInit() {
    this.usersv.getUserByToken()
    .subscribe(user => {
      console.log('user infi in friendcomponent: ' , user);
        this.userNow = user;
    });
  }

}
