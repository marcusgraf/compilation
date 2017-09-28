import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PropertiesServiceProvider} from "../../providers/properties-service/properties-service";
import {TranslateService} from "@ngx-translate/core";
import {MainPage} from "../pages";
import {HelpServiceProvider} from "../../providers/help-service/help-service";

/**
 * Generated class for the EnterAirbnbIdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enter-airbnb-id',
  templateUrl: 'enter-airbnb-id.html',
})
export class EnterAirbnbIdPage {

  airbnbIdToAdd: number;
  showError: boolean;
  helpMessage: string;

  // Our translated text strings
  private loginErrorString: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public propertiesService: PropertiesServiceProvider,
    public helpService: HelpServiceProvider,
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterAirbnbIdPage');
  }

  addPropertyByID() {
    this.propertiesService.addPropertyByAirbnbId(this.airbnbIdToAdd).subscribe(
      (resp) => {
        this.navCtrl.push(MainPage);
      },
      (error) => {
        const errorBody = JSON.parse(error._body);
        this.helpMessage = this.helpService.loginUserMessages[errorBody.errorCode];
        this.showError = true;
      });
  }

}
