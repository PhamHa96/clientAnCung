import { IQuan } from './../models/IQuan';
import { QuanAnService } from './quan-an.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class StatesService {
    private quan: BehaviorSubject<IQuan[]> = new BehaviorSubject(new Array());
    get QuanAn() {
        return this.quan.asObservable();
    }
    constructor(private quanansv: QuanAnService) { }
    // thay doi
    getAll() {
        const sinhviens = this.quanansv.getAllRestaurents().subscribe(data => {
            this.quan.next(data);
        });
    }
    find(keyword: string) {
        this.quanansv.searchRestaurent(keyword).subscribe(results => {
            this.quan.next(results);
        });
    }
}
