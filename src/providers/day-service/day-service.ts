import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Api} from "../api";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";

@Injectable()
export class DayServiceProvider {

  baseUrl: string;
  propertyEndPoint: string = 'MyListings';

  constructor(
    public api: Api,
    public vayooApiService: VayooApiServiceProvider
  ) {
    console.log('Hello DayServiceProvider Provider');
  }

  init(propertyId){
    this.baseUrl = this.propertyEndPoint + '/' + propertyId + '/';
  }

  changePrice(propertyId, day, newPrice){
    const apiParams = {
      alj: propertyId,
      dia: day,
      pr: newPrice
    };
    return this.api.get('jCambiarPrecio', apiParams);
  }

  changeMinimumStay(propertyId, day, newMinimumStay){
    const apiParams = {
      alj: propertyId,
      dia: day,
      mn: newMinimumStay
    };
    return this.api.get('jCambiarMinimumNights', apiParams);
  }

  fetchPositionData(day){
    return this.vayooApiService.get(this.baseUrl + 'SearchEnginePositions/' + day).map(
      (data) => data.searchEnginePositions
    );
  }

  fetchEvents(propertyId, day){
    const apiParams = {
      alj: propertyId,
      dia: day,
    };
    return this.api.get('jGetEventosDia', apiParams);
  }

  fetchHotelsPrices(propertyId, day){
    const apiParams = {
      alj: propertyId,
      dia: day,
    };
    return this.api.get('jGetPrecioHotelesDia', apiParams);
  }

  orderHotelsPricing(hotelsPrices) {
    let hotels = {
      priceGoesUp:[],
      samePrice: [],
      priceGoesDown: []
    };

    for (let index = 0; index < hotelsPrices.length; index++){
      let hotelPrices = hotelsPrices[index];

      let usualPrice = hotelPrices.PrecioHabitual;
      let todaysPrice = hotelPrices.PrecioEseDia;

      let difference = todaysPrice - usualPrice;
      let absoluteDifference = Math.abs(difference);
      let usualPrice10percent = usualPrice * 0.05;
      let similarPrices = absoluteDifference < usualPrice10percent;

      let priceGoesUp = difference > 0;
      let priceGoesDown = difference < 0;

      let hotelData = {
        name: hotelPrices.Hotel,
        usualPrice: usualPrice,
        todaysPrice: todaysPrice,
        difference: absoluteDifference,
        picture: hotelPrices.Picture
      };

      if (similarPrices){
        hotels.samePrice.push(hotelData);
      }else {
        if (priceGoesUp){
          hotels.priceGoesUp.push(hotelData);
        }else if (priceGoesDown) {
          hotels.priceGoesDown.push(hotelData);
        }
      }
    }

    for (let key in hotels) {
      if (hotels.hasOwnProperty(key)) {
        let hotelsArray = hotels[key];

        /*                if (hotelsArray.length == 0){
         delete hotels[key];
         continue;
         }*/

        hotelsArray.sort(function(a, b) {
          return a.difference - b.difference;
        });
      }
    }

    let trend = {
      mostPricesGoUp: hotels.priceGoesUp.length > hotels.priceGoesDown.length,
      mostPricesGoDown: hotels.priceGoesUp.length < hotels.priceGoesDown.length,
      mostPricesMantain: false
    };
    trend.mostPricesMantain =  !(trend.mostPricesGoUp || trend.mostPricesGoDown);

    return {
      hotels: hotels,
      trend: trend
    };
  };


}
