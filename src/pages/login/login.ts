import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';

import {LinkAccountPage} from "../link-account/link-account";
import {EnterAirbnbIdPage} from "../enter-airbnb-id/enter-airbnb-id";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) { }

  linkAccount() {
    this.navCtrl.push(LinkAccountPage);
  }

  enterAirbnbId() {
    this.navCtrl.push(EnterAirbnbIdPage);
  }

  findProperty() {
    this.navCtrl.push(MapPage);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
