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
        this.sex = true;
      } else {
        this.sex = false;
      }
    }
  onFileSelected(event) {
    // this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);

    // const fd: any = new FormData();
    // fd.append('file', this.selectedFile, this.selectedFile.name);
    // const URL = 'http://localhost:8081/upload/' + this.userId;
    // this.http.post(URL, fd).subscribe(res => {
    //   console.log(res);
    // });
  }

  // update(form: NgForm) {
  //   this.onTrueDisable.emit(true);
  //   console.log('form.value', form.value);
  //   this.userService.updateUser(this.dataUser._id, form.value).subscribe(data => {
  //     console.log('data >>', data);
  //     if (data) {
  //       this.toastr.success('Edit successfully !');
  //     } else {
  //       this.toastr.error('Edit Fail');

  //     }
  //   });
  // }
  update(form: NgForm) {
    console.log(form.value);
    console.log('this.dataUser._id', this.dataUser._id);
    this.userService.updateUser(form.value).then(data => {
      this.toastr.success('Update Info succsessfully', '', { positionClass: 'toast-bottom-right' });
      this.onTrueDisable.emit(true);
    });
  }

  cancel(form: NgForm) {
    this.onTrueDisable.emit(true);
  }

}
