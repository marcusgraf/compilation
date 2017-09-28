import {Component, Input} from '@angular/core';
import {Day} from "../../models/day";
import {Property} from "../../models/property";
import {DayServiceProvider} from "../../providers/day-service/day-service";


@Component({
  selector: 'hotels-day-tab',
  templateUrl: 'hotels-day-tab.html'
})
export class HotelsDayTabComponent {

  @Input() day: Day;
  @Input() property: Property;
  hotels: any;
  hotelsLists: {
    firstList: {}[],
    secondList: {}[],
    thirdList: {}[],
  } = {
    firstList: [],
    secondList: [],
    thirdList: [],
  };
  firstListText: string;
  secondListText: string;
  thirdListText: string;
  raiseListText: string = "hotels raise their prices today";
  lowerListText: string = "hotels lower their prices today";
  maintainListText: string = "hotels maintain their prices today";

  constructor(private dayService: DayServiceProvider ) {
    console.log('Hello PositionDataComponent Component');
  }

  ngOnInit() {
    this.dayService.fetchHotelsPrices(this.property.id, this.day.sqlDate).subscribe(
      (data) => {
        this.hotels = this.dayService.orderHotelsPricing(data);

        if (this.hotels.trend.mostPricesGoUp){
          this.hotelsLists.firstList = this.hotels.hotels.priceGoesUp;
          this.hotelsLists.secondList = this.hotels.hotels.priceGoesDown;
          this.hotelsLists.thirdList = this.hotels.hotels.samePrice;
          this.firstListText = this.raiseListText;
          this.secondListText = this.lowerListText;
          this.thirdListText = this.maintainListText;
        }

        if (this.hotels.trend.mostPricesGoDown){
          this.hotelsLists.firstList = this.hotels.hotels.priceGoesDown;
          this.hotelsLists.secondList = this.hotels.hotels.priceGoesUp;
          this.hotelsLists.thirdList = this.hotels.hotels.samePrice;
          this.firstListText = this.lowerListText;
          this.secondListText = this.raiseListText;
          this.thirdListText = this.maintainListText;
        }

        if (this.hotels.trend.mostPricesMantain){
          this.hotelsLists.firstList = this.hotels.hotels.samePrice;
          this.hotelsLists.secondList = this.hotels.hotels.priceGoesUp;
          this.hotelsLists.thirdList = this.hotels.hotels.priceGoesDown;
          this.firstListText = this.maintainListText;
          this.secondListText = this.raiseListText;
          this.thirdListText =  this.lowerListText;
        }
      }
    );
  }
}
