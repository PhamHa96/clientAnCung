import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuanAnService } from '../../providers/quan-an.service';
import { IQuan } from '../../models/IQuan';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  quanAn: IQuan;
  idQuanAn: String;
  constructor(private quanansv: QuanAnService, public thisDialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  createParty() {
    this.quanansv.nhanIdQuanAn.subscribe(idQuanAn => this.idQuanAn = idQuanAn); // Nhận id từ service
    console.log('id quan o create dialog: ', this.idQuanAn);
  }
  onCloseConfirm() {
    this.createParty();
    this.thisDialogRef.close('confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }
}
