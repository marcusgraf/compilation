import {Component, Input, OnInit} from '@angular/core';
import {DayServiceProvider} from "../../providers/day-service/day-service";
import {Day} from "../../models/day";
import {Property} from "../../models/property";


@Component({
  selector: 'position-day-tab',
  templateUrl: 'position-day-tab.html'
})
export class PositionDayTabComponent implements OnInit{

  @Input() day: Day;
  @Input() property: Property;
  positionData: any;
  param: Object;

  constructor(private dayService: DayServiceProvider ) {
    console.log('Hello PositionDataComponent Component');

  }

  ngOnInit() {
    this.param = {value: this.property.address};

    if (this.day.visibility === 1 && this.day.position>0){
      this.dayService.init(this.property.id);
      this.dayService.fetchPositionData(this.day.sqlDate).subscribe(
        (data) => {
          this.positionData = data;
          console.log(data);
        }
      );
    }
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
}
