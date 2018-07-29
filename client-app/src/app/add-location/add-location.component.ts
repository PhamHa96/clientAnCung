import { IQuan } from './../models/IQuan';
import { TypeFoodService } from './../providers/type-food.service';
import { AgmCoreModule, CircleManager, MouseEvent } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuanAnService } from '../providers/quan-an.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MyDialogComponent } from '../content/my-dialog/my-dialog.component';
import { JoinDialogComponent } from '../content/join-dialog/join-dialog.component';
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  typeFood: any = {};
  quan: IQuan = {
    name: '',
    address: '',
    long: 10,
    lat: 106,
  };
  //   mapClicked($event: MouseEvent) {
  //     this.setLat= $event.coords.lat;
  //     this.setLng= $event.coords.lng;
  //     this.getDataQuan(this.setLat, this.setLng);
  //     console.log(this.setLat + " , " + this.setLng);
  //   }
  selectedFile: File = null;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public file = new FormData();
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _typeFood: TypeFoodService,
    private quanAnsv: QuanAnService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // set google maps defaults in 97 Man Thien, q9
    this.zoom = 4;
    this.latitude = 10.8478152;
    this.longitude = 106.78600099999994;

    // create search FormControl ảnh ở đâu nowi gửi ảnh
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log('this.latitude , longitude===', this.latitude, this.longitude);
        });
      });
    });
    this.ngGetTypeFood();
  }
  // GET MYLOCATION
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  onFileSelected(event) {
    console.log('event file ', event);
    this.selectedFile = event.target.files[0];
  }
  // get list type food
  ngGetTypeFood() {
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data => {
      this.typeFood = data;
      return this.typeFood;
    });
  }
  // upload image
  uploadImage(id) {
    const fd = new FormData();
    fd.append('files', this.selectedFile);
    this.quanAnsv.uploadImageRestaurent(fd, id).subscribe(res => {
      console.log('res in image', res);
    });
  }
  // create restaurent
  createRestaurent() {
    this.quan.long = this.longitude;
    this.quan.lat = this.latitude;
    console.log('data get dc quan:::', this.quan);
    this.quanAnsv.createRestaurent(this.quan).subscribe(res => {
      console.log('res quan tra ve', res);
      if (res) {
        if (res.statusCode === 400) {
          this.toastr.error('RESTAURANT IS EXISTED');
        } else {
          this.uploadImage(res._id);
          this.toastr.success('Create restaurent success !');
        }
      } else {
        this.toastr.error('Create restaurent false !');
      }
    });
  }


}
