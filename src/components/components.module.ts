import { NgModule } from '@angular/core';
import { OverviewBoxComponent } from './overview-box/overview-box';
import { MonthComponent } from './month/month';
import { DayComponent } from './day/day';
import { PriceDayTabComponent } from './price-day-tab/price-day-tab';
import { PositionDayTabComponent } from './position-day-tab/position-day-tab';
import { MinimumStayDayTabComponent } from './minimum-stay-day-tab/minimum-stay-day-tab';
import { EventsDayTabComponent } from './events-day-tab/events-day-tab';
import { HotelsDayTabComponent } from './hotels-day-tab/hotels-day-tab';
import { PriceComponent } from './price/price';
import { PropertyItemComponent } from './property-item/property-item';
@NgModule({
	declarations: [OverviewBoxComponent,
    MonthComponent,
    DayComponent,
    PriceDayTabComponent,
    PositionDayTabComponent,
    MinimumStayDayTabComponent,
    EventsDayTabComponent,
    HotelsDayTabComponent,
    PriceComponent,
    PropertyItemComponent,
    ],
	imports: [],
	exports: [OverviewBoxComponent,
    MonthComponent,
    DayComponent,
    PriceDayTabComponent,
    PositionDayTabComponent,
    MinimumStayDayTabComponent,
    EventsDayTabComponent,
    HotelsDayTabComponent,
    PriceComponent,
    PropertyItemComponent,
    ]
})
export class ComponentsModule {}
