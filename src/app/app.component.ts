import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';


import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {PropertiesServiceProvider} from "../providers/properties-service/properties-service";
import {Subscription} from "rxjs/Subscription";
import {Property} from "../models/property";
import {TabsPage} from "../pages/tabs/tabs";
import {WelcomePage} from "../pages/welcome/welcome";

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: Page;
  properties: Property[];
  private subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private propertiesService: PropertiesServiceProvider,

  ) {
    this.getFirstPage();
    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  initTranslate() {
    this.translate.setDefaultLang('en');

    this.settings.load().then((settings) => {
      if (settings && settings.language){
        this.translate.use(settings.language);
      }
      else if (this.translate.getBrowserLang() !== undefined) {
        this.translate.use(this.translate.getBrowserLang());
      } else {
        this.translate.use('en'); // Set your language here
      }
    });

    this.translate.get(['GENERAL']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.GENERAL.BACK_BUTTON_TEXT);
    });
  }

  getFirstPage(){
    this.properties = this.propertiesService.getUserProperties();
    this.subscription = this.propertiesService.propertiesChanged
      .subscribe(
        (properties: Property[]) => {
          this.properties = properties;
          if (this.properties.length > 0){
            this.rootPage = TabsPage;
          }else{
            this.rootPage = WelcomePage;
          }
        }
      );
  }
}
