import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Day} from "../../models/day";
import {Month} from "../../models/month";
import {Property} from "../../models/property";

@IonicPage()
@Component({
  selector: 'page-day',
  templateUrl: 'day.html',
})
export class DayPage {
  day: Day;
  month: Month;
  property: Property;
  dataToShow: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.day = navParams.get('day');
    this.month = navParams.get('month');
    this.property = navParams.get('property');
    this.dataToShow = navParams.get('dataToShow');
  }

  ionViewDidLoad() {
  }

}
