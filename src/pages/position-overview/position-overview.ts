import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ItemDetailPage} from "../item-detail/item-detail";
import {Property} from "../../models/property";
import {RecommendationsPage} from "../recommendations/recommendations";
import {PropertyServiceProvider} from "../../providers/property-service/property-service";
import {DayPage} from "../day/day";

/**
 * Generated class for the PositionOverviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-position-overview',
  templateUrl: 'position-overview.html',
})
export class PositionOverviewPage extends ItemDetailPage {


  ionViewDidLoad() {
    this.propertyService.init(this.property.id);
    this.propertyService.fetchPropertyRecommendations().subscribe(
      (recommendations) => {
        this.property.processRecommendations(recommendations);
        this.param = {value: this.userService.currentUser.searchKeyword};
      }
    );
    this.propertyService.fetchPropertyPerformance().subscribe(
      (performanceData) => {
        this.property.processPerformance(performanceData);
        // TODO eliminate
        this.property.averagePositionPage = null;
        this.overviewBoxes[2]['data'] = this.property.averagePositionPage;
      }
    );

  }

  openDay(day, month){
    this.navCtrl.push(DayPage, {
      day: day,
      month: month,
      property: this.property,
      dataToShow: this.overviewBoxes[2]
    });
  }

  dayStyle(day, month, index){
    let styles = [];
    if (day.dayOfTheWeek !== 1 && day.month === month.number){
      styles.push('day-border-left');
    }else{
      styles.push('no-day-border-left');
    }

    if (index !== month.weeks.length - 1){
      styles.push('day-border-bottom');
    }

    if (!day.free && day.month === month.number){
      styles.push('day-occupied');
    }


    return styles;
  }

  ordinalSupText(number){
    if (typeof number !== 'number'){
      return '';
    }
    if (number === 1){
      return 'st';
    }else if (number === 2){
      return 'nd';
    }else if (number === 3){
      return 'rd';
    }else{
      return 'th';
    }
  };
}
