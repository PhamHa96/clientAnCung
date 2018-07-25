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


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  typeFood: any = {};
  //   mapClicked($event: MouseEvent) {
  //     this.setLat= $event.coords.lat;
  //     this.setLng= $event.coords.lng;
  //     this.getDataQuan(this.setLat, this.setLng);
  //     console.log(this.setLat + " , " + this.setLng);
  //   }

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _typeFood: TypeFoodService
  ) { }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
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
  // get list type food
  ngGetTypeFood() {
    this._typeFood.getDataTypeFood();
    this._typeFood.getAllType.subscribe(data => {
      this.typeFood = data;
      return this.typeFood;
    });
  }
}
