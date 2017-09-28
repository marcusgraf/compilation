import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Property} from "../../models/property";
import {PropertyServiceProvider} from "../../providers/property-service/property-service";

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  property: Property;
  ranking: {}[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyService: PropertyServiceProvider) {
    this.property = this.navParams.get('property');
  }

  ionViewDidLoad() {
    this.propertyService.fetchPropertyAreaBookings(this.property.id).subscribe(
      (ranking) => this.ranking = ranking
    );
  }

}
