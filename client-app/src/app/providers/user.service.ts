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
  private apiUrl = 'https://ancungfriend.herokuapp.com/api/';
  checkLogin(email: String, password: String): Observable<any> {
    console.log(email);
    console.log(password);
    return this.http.post(this.apiUrl + 'auth/login', { email: email, password: password })
      .pipe(map(token => {
        console.log('token o user service: ', token);
        return token.json();
      }));
  }

  getUserByToken() {
    return this.http.get(this.apiUrl + 'auth', this.tokenService.addToken())
      .pipe(map(user => {
        // console.log('user trong getUserBytoken', user.json() );
        return user.json();
      }));
  }
  update(user: IUser): Observable<any> {
    return this.http.put(this.apiUrl + 'user/', user, this.token);
  }
  updateUser(body) {
    return this.http.put(this.apiUrl + 'api/user/', body, this.token)
      .toPromise()
      .then(response => response.json());
  }
  uploadAvatarUser(formdata: FormData, id): Observable<any> {
    return this.http.post(this.apiUrl + 'api/avatar' + id, formdata).map(data => {
      return data.json() as any;
    });
  }
  // get all user
  getAllUser(): Observable<IUser[]> {
    return this.http.get(this.apiUrl + 'user', this.token).map(data => {
      console.log('hihi list user: ', data.json());
      return data.json() as IUser[];
    });
  }
  getUsertByID(id: String): Observable<IUser> {
    return this.getAllUser().map(user => {
      return user.find(iduser => {
        return iduser._id === id;
      });
    });
  }
  getUsertByNameOrEmail(keySearch: String): Observable<any> {
    return this.getAllUser().map(user => {
      return user.filter(iduser => {
        return iduser.name.toLowerCase().includes(keySearch.toLowerCase())
          || iduser.email.toLowerCase().includes(keySearch.toLowerCase());
      });
    });
  }
  addFriend(id) {
    return this.http.get(this.apiUrl + 'addfriend/' + id, this.token).map(data => {
      console.log('add friend tra ve ', data.json());
      return data.json();
    });
  }
}

