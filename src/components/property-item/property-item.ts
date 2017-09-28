import { Component, Input } from '@angular/core';

/**
 * Generated class for the PropertyItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'property-item',
  templateUrl: 'property-item.html'
})
export class PropertyItemComponent {

  @Input() property: {};
  @Input() position: number;

  constructor() {
  }

  composeImgUrl(img) {
    return 'https://a2.muscache.com/im/pictures/' + img + '.jpg?aki_policy=small';
  };

}
