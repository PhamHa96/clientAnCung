import { StatesService } from './../../providers/state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IQuan } from './../../models/IQuan';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MyDialogComponent} from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';

@Component({
  selector: 'app-quanan',
  templateUrl: './quanan.component.html',
  styleUrls: ['./quanan.component.scss']
})
export class QuananComponent implements OnInit {
  quans: IQuan[] = [];
  txtTim = '';
  constructor(public dialog: MatDialog, private _quananStateService: StatesService, private quanAnsv: QuanAnService) { }
  ngOnInit(): void {
   this._quananStateService.QuanAn.subscribe(quans => {
     this.quans = quans;
   });
   this._quananStateService.getAll();
  }
  search() {
    this._quananStateService.find(this.txtTim as string);
  }
  // mo create dialog
  openDialog(idQuanAn) {
    this.quanAnsv.shareIdQuanAn(idQuanAn); // gọi service shareIdQuanAn và gửi id của quán
    console.log('idQuanAn', idQuanAn);
      const dialogRef = this.dialog.open(MyDialogComponent, {
        width: '600px',
      });
    }
}





