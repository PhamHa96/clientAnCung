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
  form: NgForm;
  // sex: boolean;
  selectedFile: File = null;
  getTokenInLocalStorage =  localStorage.getItem('x');
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
        this.form.value.sex = 'male';
      } else {
        this.form.value.sex = 'female';
      }
    }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log('this.selectedFile', this.selectedFile);

    const fd: any = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    const URL = 'https://ancungfriend.herokuapp.com/api/avatar';
    this.http.post(URL, fd ).subscribe(res => {
      console.log(res);
    });
  }

  update(form: NgForm) {
    console.log('data user', form.value, this.dataUser);
    this.userService.update(form.value).subscribe(data => {
      console.log(data);
      if (data) {
        this.toastr.success('Update Successfully');
      } else {
        this.toastr.error('Update Fail');

      }
    });
  }
  cancel() {
    this.onTrueDisable.emit(true);
  }

}
