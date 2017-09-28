import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {InAppPurchase2} from "@ionic-native/in-app-purchase-2";
import {UserServiceProvider} from "../user-service/user-service";
import {HelpServiceProvider} from "../help-service/help-service";
import {Api} from "../api"

@Injectable()
export class StoreServiceProvider {
  initialized = false;
  purchaseOwned: boolean;
  purchaseStatus: string;
  orderId: string;
  storeName: string;

  constructor(
    private api: Api,
    private platform: Platform,
    private store: InAppPurchase2,
    private userService: UserServiceProvider,
    private helpService: HelpServiceProvider
  ){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        this.init();
      }
    });

  }

  getAvailableSubscription() {
    const ios = this.platform.is('ios');
    const android = this.platform.is('android');

    if (ios){
      return 'listingFindableGeneralSubscription';
    }else if (android){
      return 'listingFindableGeneralSubscription';
    }
  };

  init() {
    console.log('storeService -> initializing store');
    this.store.verbosity = this.store.WARNING;        // Let's set a pretty high verbosity level
    this.store.register({
      id: this.getAvailableSubscription(),
      alias: "vayoo 1 property subscription",
      type: this.store.PAID_SUBSCRIPTION
    });

    this.store.ready().then((ready) => console.log('Store ready'));

    this.registerApprovedEvent();

    this.store.refresh();
    this.initialized = true;
    console.log('storeService -> store initialized');
  };

  registerApprovedEvent() {
    console.log('storeService -> Setting approved event listener');
    this.store.when(this.getAvailableSubscription()).approved((p) => {
      console.log('storeService -> Suscription approved status: ' + p.state + ' owned: ' + p.owned);

      if (!this.userService.checkUserIsSuscribed()){
        console.log('storeService -> New user suscribed status: ' + p.state + ' owned: ' + p.owned);

        p.finish();
        this.purchaseOwned = p.owned;
        this.purchaseStatus = p.state;

        let ticketText = 'El usuario ' + this.userService.clientId + ' se ha suscrito.';
        if (this.userService.mail){
          ticketText += 'Su mail es ' + this.userService.mail;
        }else{
          ticketText += 'No tenemos su mail.';
        }
/*        this.helpService.sendError('Vayoo App', 'app@vayoo.com', ticketText);
        $window.ga('send', {
          hitType: 'pageview',
          page: '/newSubscription'
        });*/
      }

      let pro_data = JSON.parse(p.transaction);
      try{
        this.orderId = pro_data.id;
        this.storeName = pro_data.type;
        console.log('storeService -> Store retrieved product transaction data (purchaseId: ' + pro_data.id + ' Store: ' + pro_data.type);
        return this.api.get('jInformeSuscripcion', { pown: true, orderID: pro_data.id, store: pro_data.type});
      }catch (error){
        console.warn('storeService -> Store did not retrieve product transaction data (purchaseId and Store)');
      }

    });
    console.log('storeService -> Approved event listener set');
  };

  subscribe(){
    console.log('storeService -> suscribing user');
    let promise = this.store.order(this.getAvailableSubscription());

    promise
      .then(function () {
        console.log('storeService -> sucribing user order ok');
      })
      .error(function () {
        console.error('storeService -> suscribing user order error');

        let ticketText = 'El usuario ' + this.userService.clientId + 'no ha podido completar su compra debido a un error';
        if (this.userService.mail){
          ticketText += 'Su mail es ' + this.userService.mail;
        }else{
          ticketText += 'No tenemos su mail.';
        }
        this.helpService.sendTicket('Vayoo App', 'app@vayoo.com', ticketText);
      })
    ;
  };
}
