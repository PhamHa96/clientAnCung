import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../providers/login.service';
import { UserService } from '../../providers/user.service';
import { IUser } from '../../models/IUser';

@Component({
    selector: 'app-left',
    templateUrl: './left.component.html',
    styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
    isInLogin = false;
    user: IUser;
    constructor(private userService: UserService, public router: Router, private _login: LoginService) { }

    ngOnInit() {
        // this._getprofile.getProfile().then(data => {
        //   this.dataUser = data;
        // });
        const checkToken = localStorage.getItem('x');
        if (checkToken) {
            this.isInLogin = true;
        }
        this.userService.getUserByToken()
            .subscribe(user => {
                console.log('user image ?????', user.image );
                this.user = user;
                if (user) {
                    this.isInLogin = true;
                }
            });
    }

    edit() {
        //     // this._getprofile.setDisable(true);
    }

    signout() {
        localStorage.clear();
        //     // this._login.setIsLogin(false);
        // this.router.navigate(['/login']);
    }
}
