import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPreferencesPage } from './calendar-preferences';

@NgModule({
  declarations: [
    CalendarPreferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPreferencesPage),
  ],
})
export class CalendarPreferencesPageModule {}
