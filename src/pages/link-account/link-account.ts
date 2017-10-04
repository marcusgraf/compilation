import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PropertiesServiceProvider} from "../../providers/properties-service/properties-service";
import {HelpServiceProvider} from "../../providers/help-service/help-service";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-link-account',
  templateUrl: 'link-account.html',
})
export class LinkAccountPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  showError: boolean;
  helpMessage: string;
  errorMessages: Object;

  // Our translated text strings
  private loginErrorString: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public propertiesService: PropertiesServiceProvider,
    public helpService: HelpServiceProvider,
    public toastCtrl: ToastController,
  ) {
    this.translateService.get('API_ERRORS').subscribe((values) => {
      this.errorMessages = values;

    });
    this.translateService.onLangChange.subscribe((values) => {
      this.errorMessages = values.translations['API_ERRORS'];
    });
  }

  ionViewDidLoad() {
  }

  linkAccount() {
    this.propertiesService.addPropertyByAirbnbAccount(this.account.email, this.account.password).subscribe(
      (resp) => {
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
