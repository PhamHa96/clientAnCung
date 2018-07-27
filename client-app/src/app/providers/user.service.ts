import { TokenService } from './token.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { IUser } from '../models/IUser';
// import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
    constructor(private http: Http,
        private router: Router,
        private tokenService: TokenService
    ) { }
    private token = this.tokenService.getToken();
    checkLogin(email: String, password: String): Observable<any> {
        console.log(email);
        console.log(password);
        return this.http.post('https://ancungfriend.herokuapp.com/api/auth/login', { email: email, password: password })
            .pipe(map(token => {
                console.log('token o user service: ', token);
                return token.json();
            }));
    }

    getUserByToken() {
        return this.http.get('https://ancungfriend.herokuapp.com/api/auth', this.tokenService.addToken())
            .pipe(map(user => {
                // console.log('user trong getUserBytoken', user.json() );
                return user.json();
            }));
    }
    // updateUser(id: String, user: IUser): Observable<any> {
    //     return this.http.put('https://ancungfriend.herokuapp.com/api/user/' + id, user, this.token) ;
    //   }
    update(user: IUser): Observable<any> {
        return this.http.put('https://ancungfriend.herokuapp.com/api/user/', user, this.token);
    }
    updateUser(body) {
        return this.http.put('https://ancungfriend.herokuapp.com/api/user/', body, this.token)
            .toPromise()
            .then(response => response.json());
    }
    uploadAvatarUser(formdata: FormData, id): Observable<any> {
        return this.http.post('https://ancungfriend.herokuapp.com/api/avatar' + id , formdata).map(data => {
          return data.json() as any;
        });
      }
}
