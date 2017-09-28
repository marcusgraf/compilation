import {Component, Input} from '@angular/core';
import {Day} from "../../models/day";

/**
 * Generated class for the DayComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'day',
  templateUrl: 'day.html'
})
export class DayComponent {

  @Input()
  day: Day;

  @Input()
  dataToShow: {};

  @Input()
  showOcuppancy: boolean;
  showEvents: boolean = false;

  constructor() {
  }


}
