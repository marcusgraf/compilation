import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Property} from "../../models/property";
import {MonthPage} from "../month/month";

@IonicPage()
@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html',
})
export class RecommendationsPage {
  property: Property;
  dataToShow: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.property = navParams.get('property');
    this.dataToShow = navParams.get('dataToShow');
  }

  ionViewDidLoad() {
    this.property.getYearRecommendations();
  }

  openMonth(month){
    this.navCtrl.push(MonthPage, {
      property: this.property,
      month: month,
      dataToShow: this.dataToShow
    });
  }
}
