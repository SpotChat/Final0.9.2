import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { geoLocation } from "../../providers/geolocation";

@Component({
  selector: 'page-home',
  templateUrl: '../view/home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public loc:geoLocation) {
    loc.init();
  }

}
