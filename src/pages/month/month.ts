import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Month} from "../../models/month";
import {DayPage} from "../day/day";
import {Property} from "../../models/property";
import {CalendarPreferencesPage} from "../calendar-preferences/calendar-preferences";

@IonicPage()
@Component({
  selector: 'page-month',
  templateUrl: 'month.html',
})
export class MonthPage {
  month: Month;
  property: Property;
  dataToShow: string;
  showOccupancy: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.month = navParams.get('month');
    this.property = navParams.get('property');
    this.dataToShow = navParams.get('dataToShow');
  }

  ionViewDidLoad() {
  }

  openDay(day){
    this.navCtrl.push(DayPage, {
      day: day,
      month: this.month,
      property: this.property,
      dataToShow: this.dataToShow
    });
  }

  swipeEvent(e) {
  }

  openPreferences() {
    let addModal = this.modalCtrl.create(CalendarPreferencesPage);
    addModal.onDidDismiss(values => {
      if (values) {
        this.showOccupancy = values.showOccupancy;
      }
    });
    addModal.present();
  }

}
