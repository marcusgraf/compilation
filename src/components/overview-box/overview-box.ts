import {Component, Input} from '@angular/core';

@Component({
  selector: 'overview-box',
  templateUrl: 'overview-box.html',
})
export class OverviewBoxComponent {
  @Input()
  data: {title: string, icon: string, description: string, data: number, page: any};

  constructor() {
  }


}
