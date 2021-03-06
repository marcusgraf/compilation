import {Component, Input, OnInit} from '@angular/core';
import {DayServiceProvider} from "../../providers/day-service/day-service";
import {Day} from "../../models/day";
import {Property} from "../../models/property";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'position-day-tab',
  templateUrl: 'position-day-tab.html'
})
export class PositionDayTabComponent implements OnInit{

  @Input() day: Day;
  @Input() property: Property;
  positionData: any;
  param: Object;

  constructor(
    private dayService: DayServiceProvider,
    private userService: UserServiceProvider,
    private iab: InAppBrowser
  ) {

  }

  ngOnInit() {
    this.param = {value: this.userService.currentUser.searchKeyword};

    if (this.day.visibility === 1 && this.day.position>0){
      this.dayService.init(this.property.id);
      this.dayService.fetchPositionData(this.day.sqlDate).subscribe(
        (data) => {
          this.positionData = data;
        }
      );
    }else if(this.day.visibility === 3){
      const browser = this.iab.create('http://www.vayoo.com/change-your-minimum-stay');
      browser.show();

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
