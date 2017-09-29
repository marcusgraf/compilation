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
import {HelpPage} from "../help/help";



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
    private settingsService: Settings,
  ) {
    translate.get("TUTORIAL").subscribe(
      (values) => {
        this.slides = [
          {
            title: values.SLIDE1_TITLE,
            description: values.SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.SLIDE2_TITLE,
            description: values.SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.SLIDE3_TITLE,
            description: values.SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const tutorial_text = event.translations['TUTORIAL'];
      this.slides = [
        {
          title: tutorial_text['SLIDE1_TITLE'],
          description: tutorial_text['SLIDE1_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-1.png',
        },
        {
          title: tutorial_text['SLIDE2_TITLE'],
          description: tutorial_text['SLIDE2_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-2.png',
        },
        {
          title: tutorial_text['SLIDE3_TITLE'],
          description: tutorial_text['SLIDE3_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-3.png',
        },
        {
          title: tutorial_text['SLIDE4_TITLE'],
          description: tutorial_text['SLIDE4_DESCRIPTION'],
          image: 'assets/img/ica-slidebox-img-3.png',
        }
      ];
    });


  }

  startApp() {
    this.settingsService.setValue('hasSeenTutorial', true);

    this.navCtrl.setRoot(HelpPage, {}, {
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

  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
