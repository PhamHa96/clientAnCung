import { ToastrService } from 'ngx-toastr';
import { IParty } from './../../models/IParty';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  party: IParty = {
    numberMax: 2,
    timeStart: '',
    timeEnd: '',
    idRestaurant: ''
  };
  constructor(private quanansv: QuanAnService, public thisDialogRef: MatDialogRef<MyDialogComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  createParty() {
    this.quanansv.nhanIdQuanAn.subscribe(idQuanAn => this.idQuanAn = idQuanAn); // Nhận id từ service
    this.party.idRestaurant = this.idQuanAn;
    console.log('party o create dialog: ', this.party);
    const x = JSON.stringify(this.party);
    this.quanansv.createParty(x).subscribe(res => {
      console.log('res quan tra ve', res);
      if (res) {
        if (res.statusCode === 400) {
          this.toastr.error('not exist restaurent!');
        } else {
          this.toastr.success('Create party success !');
        }
      } else {
        this.toastr.error('Create restaurent false !');
      }
    });
  }
  onCloseConfirm() {
    this.createParty();
    this.thisDialogRef.close('confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('cancel');
  }
}
