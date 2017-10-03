import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import {RecommendationsPage} from "../pages/recommendations/recommendations";
import {BookingsPage} from "../pages/bookings/bookings";
import {AreaPage} from "../pages/area/area";
import {PerformancePage} from "../pages/performance/performance";
import {DayPage} from "../pages/day/day";
import {MonthPage} from "../pages/month/month";

import { Api } from '../providers/api';
import { Settings } from '../providers/settings';

import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Device } from '@ionic-native/device';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PropertiesServiceProvider } from '../providers/properties-service/properties-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { PropertyServiceProvider } from '../providers/property-service/property-service';
import { DayServiceProvider } from '../providers/day-service/day-service';


import {OverviewBoxComponent} from "../components/overview-box/overview-box";
import {MonthComponent} from "../components/month/month";
import {DayComponent} from "../components/day/day";
import {PriceDayTabComponent} from "../components/price-day-tab/price-day-tab";
import {PositionDayTabComponent} from "../components/position-day-tab/position-day-tab";
import {MinimumStayDayTabComponent} from "../components/minimum-stay-day-tab/minimum-stay-day-tab";
import {EventsDayTabComponent} from "../components/events-day-tab/events-day-tab";
import {HotelsDayTabComponent} from "../components/hotels-day-tab/hotels-day-tab";
import {PriceComponent} from "../components/price/price";
import {PropertyItemComponent} from "../components/property-item/property-item";
import {CalendarPreferencesPage} from "../pages/calendar-preferences/calendar-preferences";
import {LinkAccountPage} from "../pages/link-account/link-account";
import {EnterAirbnbIdPage} from "../pages/enter-airbnb-id/enter-airbnb-id";
import {PositionOverviewPage} from "../pages/position-overview/position-overview";
import { HelpServiceProvider } from '../providers/help-service/help-service';
import {HelpPage} from "../pages/help/help";
import { VayooApiServiceProvider } from '../providers/vayoo-api-service/vayoo-api-service';
import { StoreServiceProvider } from '../providers/store-service/store-service';
import {InAppBrowser} from "@ionic-native/in-app-browser";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
  });
}

@NgModule({
  declarations: [
    MyApp,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    SettingsPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    OverviewBoxComponent,
    RecommendationsPage,
    PerformancePage,
    BookingsPage,
    AreaPage,
    MonthComponent,
    MonthPage,
    DayComponent,
    DayPage,
    PriceDayTabComponent,
    PositionDayTabComponent,
    MinimumStayDayTabComponent,
    EventsDayTabComponent,
    HotelsDayTabComponent,
    PriceComponent,
    PropertyItemComponent,
    CalendarPreferencesPage,
    LinkAccountPage,
    EnterAirbnbIdPage,
    PositionOverviewPage,
    HelpPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    SettingsPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    OverviewBoxComponent,
    RecommendationsPage,
    PerformancePage,
    BookingsPage,
    AreaPage,
    MonthComponent,
    MonthPage,
    DayComponent,
    DayPage,
    PriceDayTabComponent,
    PositionDayTabComponent,
    MinimumStayDayTabComponent,
    EventsDayTabComponent,
    HotelsDayTabComponent,
    PriceComponent,
    PropertyItemComponent,
    CalendarPreferencesPage,
    LinkAccountPage,
    EnterAirbnbIdPage,
    PositionOverviewPage,
    HelpPage
  ],
  providers: [
    Api,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Device,
    InAppPurchase2,
    InAppBrowser,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PropertiesServiceProvider,
    UserServiceProvider,
    PropertyServiceProvider,
    DayServiceProvider,
    HelpServiceProvider,
    VayooApiServiceProvider,
    StoreServiceProvider
  ]
})
export class AppModule { }
