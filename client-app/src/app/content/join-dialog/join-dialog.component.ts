import { Component, OnInit,Inject, Input  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { QuanAnService } from '../../providers/quan-an.service';
@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.scss']
})
export class JoinDialogComponent implements OnInit {
  quanAn: any ={};
  idQuanAn: String;
  Callback: Function;
  test: string ="hello"
  constructor(
    // public thisDialogRef: MatDialogRef<JoinDialogComponent>,
    // @Inject(MAT_DIALOG_DATA)public data: any,
    // private _quanAnService : QuanAnService,
) { }



  ngOnInit() {
  // this.ngLoadJoinParty();
  }
}
