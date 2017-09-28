import {Component, Input} from '@angular/core';
import {Day} from "../../models/day";
import {Property} from "../../models/property";
import {DayServiceProvider} from "../../providers/day-service/day-service";


@Component({
  selector: 'minimum-stay-day-tab',
  templateUrl: 'minimum-stay-day-tab.html'
})
export class MinimumStayDayTabComponent {

  @Input() day: Day;
  @Input() property: Property;
  newMinimumStayValue: number;

  constructor(private dayService: DayServiceProvider ) {
    console.log('Hello MinimumStayDayTabComponent Component');
  }

  changeMinimumStay(){
    this.dayService.changeMinimumStay(this.property.id, this.day.sqlDate, this.newMinimumStayValue).subscribe(
      (res) => this.day.minimumStay = this.newMinimumStayValue
    );
  }
}
