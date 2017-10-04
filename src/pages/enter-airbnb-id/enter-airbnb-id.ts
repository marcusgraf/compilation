import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PropertiesServiceProvider} from "../../providers/properties-service/properties-service";
import {TranslateService} from "@ngx-translate/core";
import {HelpServiceProvider} from "../../providers/help-service/help-service";
import {TabsPage} from "../tabs/tabs";

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
  errorMessages: Object;

  private loginErrorString: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public propertiesService: PropertiesServiceProvider,
    public helpService: HelpServiceProvider,
  ) {
    this.translateService.get('API_ERRORS').subscribe((values) => {
      this.errorMessages = values;

    });
    this.translateService.onLangChange.subscribe((values) => {
      this.errorMessages = values.translations['API_ERRORS'];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnterAirbnbIdPage');
  }

  addPropertyByID() {
    this.propertiesService.addPropertyByAirbnbId(this.airbnbIdToAdd).subscribe(
      (ok) => {
        this.navCtrl.push(TabsPage);
      },
      (error) => {
        const errorBody = JSON.parse(error._body);
        // this.showError = true;

        const toast = this.toastCtrl.create({
          message: this.errorMessages[errorBody.errorCode],
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      });
  }

}
