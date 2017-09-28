import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {PropertiesServiceProvider} from "../../providers/properties-service/properties-service";
import {TabsPage} from "../tabs/tabs";
import {Settings} from "../../providers/settings";
import {Page} from "ionic-angular/navigation/nav-util";
import {Subscription} from "rxjs/Subscription";
import {Property} from "../../models/property";



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  nextPage: Page;
  properties: Property[];
  private subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    translate: TranslateService,
    private propertiesService: PropertiesServiceProvider,
    private settingsService: Settings
  ) {
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.slides = [
        {
          title: event.translations['TUTORIAL_SLIDE1_TITLE'],
          description: event.translations['TUTORIAL_SLIDE1_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-1.png',
        },
        {
          title: event.translations['TUTORIAL_SLIDE2_TITLE'],
          description: event.translations['TUTORIAL_SLIDE2_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-2.png',
        },
        {
          title: event.translations['TUTORIAL_SLIDE3_TITLE'],
          description: event.translations['TUTORIAL_SLIDE3_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-3.png',
        }
      ];
    });


  }

  startApp() {
    this.settingsService.setValue('hasSeenTutorial', true);

    this.navCtrl.setRoot(this.nextPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);

    this.properties = this.propertiesService.getUserProperties();
    this.subscription = this.propertiesService.propertiesChanged
      .subscribe(
        (properties: Property[]) => {
          this.properties = properties;
          if (this.properties.length > 0){
            this.nextPage = TabsPage;
          }else{
            this.nextPage = WelcomePage;
          }
        }
      );

    if (this.properties.length > 0){
      this.nextPage = TabsPage;
    }else{
      this.nextPage = WelcomePage;
    }
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
