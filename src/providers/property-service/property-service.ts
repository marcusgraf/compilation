import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Api} from "../api";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";


@Injectable()
export class PropertyServiceProvider {

  baseUrl: string;
  propertyEndPoint: string = 'MyListings';

  constructor(
    public api: Api,
    public vayooApiService: VayooApiServiceProvider
  ) {

  }

  init(propertyId){
    this.baseUrl = this.propertyEndPoint + '/' + propertyId + '/';
  }

  fetchPropertyRecommendations() {
    return this.vayooApiService.get(this.baseUrl + 'Recommendations').map(
      (data) => data.recommendations
    );
  };

  fetchPropertyPerformance() {
    return this.vayooApiService.get(this.baseUrl + 'IncomePerformance').map(
      (data) => data.incomePerformance[0]
    );
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

}
