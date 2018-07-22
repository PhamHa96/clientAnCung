import { TokenService } from './token.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

    constructor(private htpp: Http,
        private router: Router,
        private tokenService: TokenService
    ) { }

    checkLogin(email: String, password: String): Observable<any> {
        console.log(email);
        console.log(password);
        return this.htpp.post('https://ancungfriend.herokuapp.com/api/auth/login', { email: email, password: password })
            .pipe(map(token => {
                console.log('token o user service: ' , token);
                return token.json();
            }));
    }

    getUserByToken() {
        return this.htpp.get('https://ancungfriend.herokuapp.com/api/user', this.tokenService.addToken())
            .pipe(map(user => {
                console.log('user trong getUserBytoken', user );
                return user.json();
            }));
    }

}
