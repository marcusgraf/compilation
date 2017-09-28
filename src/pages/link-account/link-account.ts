import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {PropertiesServiceProvider} from "../../providers/properties-service/properties-service";
import {MainPage} from "../pages";
import {HelpServiceProvider} from "../../providers/help-service/help-service";

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
  }

  linkAccount() {
    this.propertiesService.addPropertyByAirbnbAccount(this.account.email, this.account.password).subscribe(
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
