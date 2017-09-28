import {Component, Input} from '@angular/core';

/**
 * Generated class for the PriceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'price',
  templateUrl: 'price.html'
})
export class PriceComponent {
  @Input() amount: number;
  @Input() round: boolean = false;
  symbol: string;
  symbolRightSide: boolean;
  convertedAmount: number;

  constructor() {
  }

  ngOnChanges(){
    this.symbol = '€';
    this.symbolRightSide = true;
    this.round = typeof this.round !== 'undefined' ? this.round : true;
    this.convertedAmount = this.amount;
  }
}
