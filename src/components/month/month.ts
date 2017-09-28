import { Component, Input } from '@angular/core';
import {Month} from "../../models/month";

/**
 * Generated class for the MonthComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'month',
  templateUrl: 'month.html'
})
export class MonthComponent {

  text: string;

  @Input()
  month: Month;

  @Input()
  dataToShow: {};

  constructor() {

  }

}
