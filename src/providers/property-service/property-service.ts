import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Api} from "../api";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";
import { Storage } from "@ionic/storage";
import {User} from "../../models/user";
import {Subject} from "rxjs/Subject";
import {Property} from "../../models/property";


@Injectable()
export class PropertyServiceProvider {

  baseUrl: string;
  propertyEndPoint: string = 'MyListings';
  propertyId: number;
  user: User;
  private property: Property;
  propertyChanged = new Subject<Property>();

  constructor(
    public api: Api,
    public vayooApiService: VayooApiServiceProvider,
    public storage: Storage
  ) {

  }

  init(property){
    this.baseUrl = this.propertyEndPoint + '/' + property.id + '/';
    this.property = property;
    this.propertyId = property.id;
    this.user = this.vayooApiService.userService.currentUser;
  }

  fetchPropertyRecommendations() {
    const endPoint = 'Recommendations';

    if (!this.user.checkUserIsSuscribed() && this.user.trialIsFinished()){
      this.storage.get(this.propertyId + '_' +  endPoint).then(
        (recommendations) => {
          this.property.processRecommendations(recommendations);
          this.propertyChanged.next(this.property);
        }
      );
      this.storage.get(this.propertyId + '_' +  'searchKeyword').then(
        (searchKeyword) => {
          this.property.searchKeyword = this.user.searchKeyword = searchKeyword;
          this.propertyChanged.next(this.property);
        }
      );
    }else{
      this.vayooApiService.get(this.baseUrl + endPoint).map(
        (data) => {
          return data.recommendations;
        }
      ).subscribe(
        (recommendations) => {
          this.storeData(endPoint, recommendations);
          this.storeData('searchKeyword', this.vayooApiService.userService.currentUser.searchKeyword);
          this.property.searchKeyword = this.vayooApiService.userService.currentUser.searchKeyword;
          this.property.processRecommendations(recommendations);
          this.propertyChanged.next(this.property);
        }
      );
    }
  };

  fetchPropertyPerformance() {
    const endPoint = 'IncomePerformance';

    if (!this.user.checkUserIsSuscribed() && this.user.trialIsFinished()){
      this.storage.get(this.propertyId + '_' + endPoint).then(
        (performanceData) => {
          this.property.processPerformance(performanceData);
          this.propertyChanged.next(this.property);
        }
      );
    }else{
      this.vayooApiService.get(this.baseUrl + endPoint).map(
        (data) => {
          return data.incomePerformance[0];
        }
      ).subscribe(
        (performanceData) => {
          this.storeData(endPoint, performanceData);
          this.property.processPerformance(performanceData);
          this.propertyChanged.next(this.property);
        }
      );
    }
  };

  fetchPropertyAreaBookings(propertyId) {
    const today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const day = yesterday.getDate();
    const month = yesterday.getMonth()+1;
    const year = yesterday.getFullYear();

    let dateString: string;

    if (month < 10) {
      dateString = year + '0' + month + '' + day
    }else{
      dateString = year + '' + month + '' + day
    }


    const apiParams = {
      alj: propertyId,
      p2: dateString
    };
    return this.api.get('jReservasResumen', apiParams);
  };

  fetchPropertyAreaRanking(propertyId) {
    const apiParams = {
      alj: propertyId,
      periodo: '30days',
      cuantos: 15
    };
    return this.api.get('jIncomeListListProps', apiParams);
  };

  storeData(endPoint: string, data){
    this.storage.set(this.propertyId + '_' + endPoint, data);
  }

}
