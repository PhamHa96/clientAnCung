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
@Injectable()
export class QuanAnService {
  // private _dataQuan: BehaviorSubject<IQuan[]> = new BehaviorSubject(new Array());
  // private _partyQuan: BehaviorSubject<IQuan[]> = new BehaviorSubject(new Array());
  // private urlGetDataQuan = 'http://localhost:8081/quanan';
  // private idQuanAn = new BehaviorSubject<String>("");
  // nhanIdQuanAn = this.idQuanAn.asObservable();
  // constructor(private http: Http) { }

  // get getAllQuan() {
  //   return this._dataQuan.asObservable();
  // }
  // get partyQuan()
  // {
  //   return this._partyQuan.asObservable();
  // }

  // getDataQuan(): Promise<any> {
  //   return this.http.get(this.urlGetDataQuan).toPromise().then(response => {
  //     this._dataQuan.next(response.json());
  //     return response.json();
  //   }).catch(err => console.log('loi lay url get'));
  // }

  //  getPartyQuanAn(id) {
  //    try{
  //     return this.http.get(this.urlGetDataQuan+'/party/'+id).toPromise().then(response => {
  //       this._partyQuan.next(response.json());
  //       return response.json();
  //     }).catch(err => console.log('loi lay url get: ' + err));
  //    }catch(err){console.log(err);
  //    }
  // }

  // postQuanAn(slugUrl, tenQuan, timeStart, timeEnd, Address, lat, lng, detail, image){
  //   return this.http.post(this.urlGetDataQuan, {
  //     slugUrl: slugUrl,
  //     TenQuan: tenQuan,
  //     TimeStart:timeStart,
  //     TimeEnd: timeEnd,
  //     Address: Address,
  //     Detail: detail,
  //     Lat: lat,
  //     Lng: lng,
  //     Image: image
  //   })
  // }

  // shareIdQuanAn(data: String)
  // {
  //   this.idQuanAn.next(data);
  // }
  constructor(private http: Http, private router: Router, private toastSV: ToastrService, private tokenSV: TokenService) { }
  private token = this.tokenSV.getToken();
  getAllQuanAn(): Observable<any> {
    return this.http.get('https://ancungfriend.herokuapp.com/api/restaurant', this.token).pipe(map(data => {

      if (data) {
        this.toastSV.success('Load successfully !');
        return data.json();
      } else {
        this.toastSV.error('Load Failed');

      }
    }));
  }
}
