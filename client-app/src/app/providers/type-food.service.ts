import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ItypeFood } from '../models/ITypeFood';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TypeFoodService {
  private _dataTypeFood: BehaviorSubject<ItypeFood[]> = new BehaviorSubject(new Array());
  private urlGetTypeFood = 'https://ancungfriend.herokuapp.com/api/typefood';
  constructor(
    private http: Http
  ) { }

get getAllType() {
  return this._dataTypeFood.asObservable();
}

getDataTypeFood(): Promise<any> {
  return this.http.get(this.urlGetTypeFood).toPromise().then(response => {
    this._dataTypeFood.next(response.json());
    return response.json();
  }).catch(err => console.log('loi lay url get'));
}
// cach 2
getAllTypeFood(): Observable<ItypeFood[]> {
  return this.http.get(this.urlGetTypeFood).map(data => {
    // console.log(data.json());
    return data.json() as ItypeFood[];
  });
}
getTypeFoodByID(id: String): Observable <ItypeFood> {
  return this.getAllTypeFood().map(type => {
      return type.find(t => {
          return t._id === id;
      });
  });
}

}
