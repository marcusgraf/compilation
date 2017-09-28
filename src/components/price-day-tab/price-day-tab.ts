import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Day} from "../../models/day";
import {Property} from "../../models/property";
import {DayServiceProvider} from "../../providers/day-service/day-service";

/**
 * Generated class for the PriceDayTabComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'price-day-tab',
  templateUrl: 'price-day-tab.html',
  // providers: [dayServiceProvider]
})
export class PriceDayTabComponent{

  @Input()  day: Day;
  @Input()  property: Property;
  newPrice: number;
  @Output() priceChanged = new EventEmitter<void>();

  constructor(private dayService: DayServiceProvider  ) {
    console.log('Hello PriceDayTabComponent Component');
  }

  ngOnChanges(){
    this.newPrice = this.day.recommendedPrice;
  }

  changePrice(){
    this.dayService.changePrice(this.property.id, this.day.sqlDate, this.newPrice).subscribe(
      (res) => this.day.actualPrice = this.newPrice
    );
  }
}
