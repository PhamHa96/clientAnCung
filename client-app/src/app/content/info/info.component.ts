import { MapsAPILoader } from '@agm/core';
import { IQuan } from './../../models/IQuan';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyDialogComponent } from '../../content/my-dialog/my-dialog.component';
import { QuanAnService } from '../../providers/quan-an.service';
import { JoinDialogComponent } from '../join-dialog/join-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public lat: Number;
  public lng: Number;
  quanAn: IQuan = {
    _id: '',
    name: '',
    typeFood: '',
    minPrice: '1000',
    maxPrice: '10000',
    timeStart: '',
    timeAnd: '',
    address: '',
    detail: '',
    long: 0,
    lat: 0
  };
  constructor(private mapsAPILoader: MapsAPILoader, public _quananService: QuanAnService,
    public dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = (params['_id'] as string);
      this._quananService.getOneRestaurentByID(id).subscribe(quan => {
        this.quanAn = quan;
        this.lat = this.quanAn.lat;
        this.lng = this.quanAn.long;
        console.log('this.quanAn', this.quanAn);
      });
    });
    console.log('check lng lat ', this.lng, this.lat);
  }
  openDialog() {
    // let dialogRef = this.dialog.open(MyDialogComponent, {
    //   width: '600px',
    // });
  }

  openJoinDialog(idQuanAn) {
    // this._quananService.shareIdQuanAn(idQuanAn); //gọi service shareIdQuanAn và gửi id của quán
    // console.log(idQuanAn);
    //   let dialogRef = this.dialog.open(JoinDialogComponent, {
    //     width: '600px',
    //   });
    // }
  }
}
