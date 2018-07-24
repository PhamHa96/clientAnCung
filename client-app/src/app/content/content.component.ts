import { StatesService } from './../providers/state.service';
import { Component, OnInit } from '@angular/core';
import { TypeFoodService } from '../providers/type-food.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  typeFood: any = {};
  txtTim = '';
  constructor(
    private _typeFood: TypeFoodService, public _quananStateService: StatesService
  ) { }

  ngOnInit() {
    this.ngGetTypeFood();
  }
  ngGetTypeFood() {
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data => {
      this.typeFood = data;
      return this.typeFood;
    });
  }
  search() {
    this._quananStateService.find(this.txtTim as string);
  }

}
