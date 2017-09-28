import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PropertyServiceProvider} from "../../providers/property-service/property-service";
import {Property} from "../../models/property";

@IonicPage()
@Component({
  selector: 'page-performance',
  templateUrl: 'performance.html',
})
export class PerformancePage {
  property: Property;
  ranking: {}[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyService: PropertyServiceProvider) {
    this.property = this.navParams.get('property');
  }

  ionViewDidLoad() {
    this.propertyService.fetchPropertyAreaRanking(this.property.id).subscribe(
      (ranking) => this.ranking = ranking
    );
  }

}
