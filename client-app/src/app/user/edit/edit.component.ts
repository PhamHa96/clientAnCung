import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetprofileService } from '../../providers/getprofile.service';
import { NgForm  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../providers/user.service';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() isDisable: boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTrueDisable: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataUser: IUser;
  sex: boolean;
  userId: string;
  selectedFile: File = null;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();

    // this._getprofile.Disable.subscribe(value => {
    //   this.disable = value;
    // });
  }

  getProfile() {
    this.userService.getUserByToken()
      .subscribe(user => {
        console.log('user info' , user.name);
        this.dataUser = user;
      });
      if (this.dataUser.sex === 'male') {
        this.sex = true;
      } else {
        this.sex = false;
      }
    }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);

    const fd: any = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    const URL = 'http://localhost:8081/upload/' + this.userId;
    this.http.post(URL, fd).subscribe(res => {
      console.log(res);
    });
  }

  update(form: NgForm) {
    this.onTrueDisable.emit(true);
    // console.log(form.value);
    // this._getprofile.update(this.userId, form.value).then(data => {
    //   this.toastr.success('Update Info succsessfully', '', { positionClass: 'toast-bottom-right' });
    //   this._getprofile.setDisable(false);
    // });
  }

  cancel(form: NgForm) {
    // this._getprofile.setDisable(false);
  }

}
