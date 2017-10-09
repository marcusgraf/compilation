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
    this.propertyService.fetchPropertyRecommendations();
    this.propertyService.fetchPropertyPerformance();
    let userIsSubscribed = this.user.checkUserIsSuscribed;
    this.translateService.get('MONTHS').subscribe((values) => {
      this.months_names = values;

    });
    this.translateService.onLangChange.subscribe((values) => {
      this.months_names = values.translations['MONTHS'];
    });
    this.userService.userChanged.subscribe(
      (user) => {
/*        if (userIsSubscribed !== this.user.checkUserIsSuscribed){
          this.propertyService.fetchPropertyRecommendations();
          this.propertyService.fetchPropertyPerformance();
          userIsSubscribed = this.user.checkUserIsSuscribed;
        }*/
        this.user = user
      }
    );
    this.propertyService.propertyChanged.subscribe((property) => {
      this.property = property;
      this.overviewBoxes[2]['data'] = this.property.averagePositionPage;
      this.param = {value: this.property.searchKeyword};
    });


  }

  ionViewWillLeave(){

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

  updateInfo(){
    this.storeService.subscribe();
  }

  showUpdateButton(){
    return (!this.user.checkUserIsSuscribed()) && this.user.trialIsFinished();
  }

  updateTextRed(){
    if (this.showUpdateButton()){
      return 'red';
    }
  }
}
