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

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage{
  properties: Property[];
  private subscription: Subscription;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private propertiesService : PropertiesServiceProvider,
    public userService: UserServiceProvider,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.properties = this.propertiesService.getUserProperties();
    this.subscription = this.propertiesService.propertiesChanged
      .subscribe(
        (properties: Property[]) => {
          this.properties = properties;
        }
      );

  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(LoginPage);
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(propertyId) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.propertiesService.deleteProperty(propertyId);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(property: Property) {
    this.navCtrl.push(PositionOverviewPage, {
      property: property
    });
  }
}
