import { IParty } from './../../models/IParty';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../../providers/quan-an.service';
@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.scss']
})
export class JoinDialogComponent implements OnInit {
  quanAn: any = {};
  idQuanAn: String;
  listParty: IParty[];
  constructor(
    public thisDialogRef: MatDialogRef<JoinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _quanAnService: QuanAnService,
  ) { }



  ngOnInit() {
    this._quanAnService.nhanIdQuanAn.subscribe(idQuanAn => this.idQuanAn = idQuanAn); // Nhận id từ service
    this._quanAnService.getPartyByIdRestaurant(this.idQuanAn).subscribe(data => {
      this.listParty = data;
      console.log('this.listParty', this.listParty);
    });
  }
  onCloseConfirm() {
    this.thisDialogRef.close('confirm');
  }
}
