import {Component, Input} from '@angular/core';
import {PriceDayTabComponent} from "../price-day-tab/price-day-tab";
import {Property} from "../../models/property";
import {Day} from "../../models/day";
import {DayServiceProvider} from "../../providers/day-service/day-service";

/**
 * Generated class for the EventsDayTabComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'events-day-tab',
  templateUrl: 'events-day-tab.html'
})
export class EventsDayTabComponent {

  @Input() day: Day;
  @Input() property: Property;
  events: any = [];

  constructor(private dayService: DayServiceProvider ) {
    console.log('Hello PositionDataComponent Component');
  }

  ngOnInit() {
    this.dayService.fetchEvents(this.property.id, this.day.sqlDate).subscribe(
      (data) => {
        this.events = data;
        console.log(data);
      }
    );
  }
}
