import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { IUser } from './../models/IUser';
import { UserService } from './../providers/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  listFriend: any[] = [];
  objListFriend: Array<IUser> = [];
  constructor(private usersv: UserService) { }

  async ngOnInit() {
    await this.usersv.getUserByToken().subscribe(user => {
      // console.log('user infi in friendcomponent: ' , user);
        this.listFriend = user.friend;
        console.log(this.listFriend);
        this.listFriend.forEach(item => {
          this.usersv.getUsertByID(item.id_friend).subscribe(a => {
                this.objListFriend.push(a);
          });
        });
        console.log('check kq>>>>> ', this.objListFriend);
    });
  }
}
