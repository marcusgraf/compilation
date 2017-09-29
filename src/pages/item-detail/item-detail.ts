import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {RecommendationsPage} from "../recommendations/recommendations";
import {PerformancePage} from "../performance/performance";
import {BookingsPage} from "../bookings/bookings";
import {AreaPage} from "../area/area";
import {Property} from "../../models/property";
import {PropertyServiceProvider} from "../../providers/property-service/property-service";
import {StoreServiceProvider} from "../../providers/store-service/store-service";
import {VayooApiServiceProvider} from "../../providers/vayoo-api-service/vayoo-api-service";

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  property: Property;
  overviewBoxes: {}[];
  recommendations: number;
  param: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public propertyService: PropertyServiceProvider,
    public storeService: StoreServiceProvider,
    public vayooApiService: VayooApiServiceProvider
  ) {
    this.property = navParams.get('property');
    this.overviewBoxes = [
      {id: 0, name: 'price', title: 'Price Recommendations', icon: 'cash', data: '', page: RecommendationsPage},
      {id: 1, name: 'stay', title: 'Minimum Stay', icon: 'key', data: '', page: RecommendationsPage},
      {id: 2, name: 'position', title: 'Position', icon: 'search', data: '', page: RecommendationsPage},
      {id: 3, name: 'performance', title: 'Economic performance', icon: 'pricetags', data: '', page: PerformancePage},
      {id: 4, name: 'bookings', title: 'In your area on monday', icon: 'bookmarks', data: '', page: BookingsPage},
      {id: 5, name: 'area', title: 'Area average revenue', icon: 'map', data: '', page: AreaPage},
    ];
    this.param = {value: this.property.address};
  }

  ionViewDidLoad() {
    this.propertyService.fetchPropertyRecommendations().subscribe(
      (recommendations) => {
        this.property.processRecommendations(recommendations.recommendations);
        this.overviewBoxes[0]['data'] = this.property.recommendationsCount;
        this.overviewBoxes[1]['data'] = this.property.minimumStayProblemsCount;
      }
    );
    this.propertyService.fetchPropertyPerformance().subscribe(
      (performanceData) => {
        this.property.processPerformance(performanceData.incomePerformance[0]);
        this.overviewBoxes[2]['data'] = this.property.averagePositionPage;
        this.overviewBoxes[3]['data'] = this.property.incomeDifferencePropertyArea;
        this.overviewBoxes[5]['data'] = this.property.areaIncome;
      }
    );
    this.propertyService.fetchPropertyAreaBookings(this.property.id).subscribe(
      (areaBookingsData) => {
        this.property.processAreaBookings(areaBookingsData);
        this.overviewBoxes[4]['data'] = this.property.areaBookingsCount;
      }
    );
  }


  openItem(data) {
    this.navCtrl.push(data.page, {
      property: this.property,
      dataToShow: data
    });
  }

}
