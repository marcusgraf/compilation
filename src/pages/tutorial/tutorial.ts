import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Settings} from "../../providers/settings";
import {WelcomePage} from "../welcome/welcome";



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

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    translate: TranslateService,
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

    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }
}
