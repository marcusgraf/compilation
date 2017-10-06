import {Component} from '@angular/core';
import {NavController, ModalController, Platform, ActionSheetController} from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { PropertiesServiceProvider } from '../../providers/properties-service/properties-service';
import { Property } from '../../models/property';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {LoginPage} from "../login/login";
import {Subscription} from "rxjs/Subscription";
import {WelcomePage} from "../welcome/welcome";
import {PositionOverviewPage} from "../position-overview/position-overview";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage{
  properties: Property[];
  private subscription: Subscription;
  delete_confirm_text: string;
  delete_confirm_button_text: string;
  delete_cancel_button_text: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private propertiesService : PropertiesServiceProvider,
    public userService: UserServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private translateService: TranslateService
  ) {

  }

  ionViewDidLoad() {
    this.properties = this.propertiesService.getUserProperties();
    this.subscription = this.propertiesService.propertiesChanged
      .subscribe(
        (properties: Property[]) => {
          this.properties = properties;
        }
      );

    this.translateService.get('PROPERTIES').subscribe((values) => {
      this.delete_confirm_text = values['DELETE_CONFIRM_TEXT'];
      this.delete_confirm_button_text = values['DELETE_CONFIRM_BUTTON_TEXT'];
      this.delete_cancel_button_text = values['DELETE_CANCEL_BUTTON_TEXT'];
    });
    this.translateService.onLangChange.subscribe((values) => {
      const changed_values = values.translations['PROPERTIES'];
      this.delete_confirm_text = changed_values['DELETE_CONFIRM_TEXT'];
      this.delete_confirm_button_text = changed_values['DELETE_CONFIRM_BUTTON_TEXT'];
      this.delete_cancel_button_text = changed_values['DELETE_CANCEL_BUTTON_TEXT'];
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create(LoginPage);
    addModal.present();
  }

  deleteItem(propertyId) {
    let confirmDelete = this.actionSheetCtrl.create({
      title: this.delete_confirm_text,
      buttons: [
        {
          text: this.delete_confirm_button_text,
          role: 'destructive',
          handler: () => {
            this.propertiesService.deleteProperty(propertyId);
          }
        },{
          text: this.delete_cancel_button_text,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    confirmDelete.present();

  }

  openItem(property: Property) {
    this.navCtrl.push(PositionOverviewPage, {
      property: property
    });
  }

  truncatePropertyTitle(input){
    let length = 35;
    let ending = '';
    if (input.length > length) {
      let trimmedString = input.substring(0, length - ending.length);
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
      return trimmedString;
    } else {
      return input;
    }
  }

}
