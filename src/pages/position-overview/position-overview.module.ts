import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionOverviewPage } from './position-overview';

@NgModule({
  declarations: [
    PositionOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionOverviewPage),
  ],
})
export class PositionOverviewPageModule {}
