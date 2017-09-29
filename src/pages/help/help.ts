import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HelpServiceProvider} from "../../providers/help-service/help-service";
import {TutorialPage} from "../tutorial/tutorial";

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  textToSend: string;
  email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public helpService: HelpServiceProvider,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
  }

  sendTicket(){
    this.helpService.sendTicket(this.email, this.textToSend).subscribe(
      (res) => {
        let toast = this.toastCtrl.create({
          message: 'We will get back to you as soon as possible. Thanks for your patience.',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      },
      (err) => {
        let toast = this.toastCtrl.create({
          message: 'Ups! Something when wrong',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    );
  }

  goTutorial() {
    this.navCtrl.push(TutorialPage);
  }
}
