import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {MapPage} from "../map/map";
import {LinkAccountPage} from "../link-account/link-account";
import {EnterAirbnbIdPage} from "../enter-airbnb-id/enter-airbnb-id";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  linkAccount() {
    this.navCtrl.push(LinkAccountPage);
  }

  enterAirbnbId() {
    this.navCtrl.push(EnterAirbnbIdPage);
  }

  findProperty() {
    this.navCtrl.push(MapPage);
  }
}
