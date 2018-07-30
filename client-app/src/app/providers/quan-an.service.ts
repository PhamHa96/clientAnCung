import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IQuan } from './../models/IQuan';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class QuanAnService {
  quan: IQuan[] = [];
  private Token = localStorage.getItem('x');
  private apiUrl = 'https://ancungfriend.herokuapp.com/api/restaurant/';

  private idQuanAn = new BehaviorSubject<String>('');
  nhanIdQuanAn = this.idQuanAn.asObservable();
  constructor(private _http: Http, private router: Router, private toastSV: ToastrService, private tokenSV: TokenService) {
    this.getAllRestaurents().subscribe(quan => {
      this.quan = quan;
    });
  }
  private tokenGet = this.tokenSV.getToken();
  getAllRestaurents(): Observable<IQuan[]> {
    return this._http.get(this.apiUrl, this.Token).map(data => {
      console.log(data.json());
      return data.json() as IQuan[];
    });
  }
  searchRestaurent(title: string) {
    return this.getAllRestaurents().map(quans => {
      return quans.filter(quan => {
        return quan.name.toLowerCase().includes(title.toLowerCase()) || quan.typeFood.includes(title) ;
      });
    });
  }
  createRestaurent(quan: IQuan) {
    return this._http.post('https://ancungfriend.herokuapp.com/api/restaurant', quan, this.tokenGet).pipe(map(res => {
      console.log('res in service', res);
            return res.json();
    }));
  }
  uploadImageRestaurent(formdata: FormData, id): Observable<any> {
    return this._http.post('https://ancungfriend.herokuapp.com/api/restaurant/image/' + id , formdata, this.tokenGet).map(data => {
      return data.json() as any;
    });
  }
  shareIdQuanAn(data: String) {
    this.idQuanAn.next(data);
  }
  getOneRestaurentByID(id: String): Observable<IQuan> {
    return this.getAllRestaurents().map(quan => {
        return quan.find(idquan => {
            return idquan._id === id;
        });
    });
}
}
