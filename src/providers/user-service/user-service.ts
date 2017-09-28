import { Injectable } from '@angular/core';
import {Settings} from "../settings";
import {Platform} from "ionic-angular";

@Injectable()
export class UserServiceProvider {
  uuid: string;
  deviceId: number;
  clientId: number;
  propertyId: number;
  areaId: number;
  selectedPropertyName: string;
  maxChanges: number;
  changesDoneToday: number;
  changesLeft: number;
  userPremiumLevel: number;
  registrationDate: string;
  promoCode: string;
  defaultCurrency: string;
  currentCurrency: string;
  areaConfiguration: {
    propertyTypes: {
      entireHome: boolean, privateRoom: boolean, sharedRoom: boolean
    },
    propertyRooms: {
      0: boolean,
      1: boolean,
      2: boolean,
      3: boolean,
      4: boolean,
      5: boolean
    },
    radius: number,
    numberOfProperties: number
  };
  currencies: {}[];
  mail: string = '';

  constructor(
    private settings: Settings,
  ) {

  }

  saveUserData(userData) {
    this.uuid = userData.uuid;
    this.clientId = userData.IdCliente;
    this.deviceId = userData.IdDispositivo;
    this.propertyId = userData.IdAlojamiento;
    this.areaId = userData.IdZona;
    this.selectedPropertyName = userData.Nombre;
    this.maxChanges = parseInt(userData.CambiosMaximos);
    this.changesDoneToday = parseInt(userData.CambiosHechosHoy);
    this.changesLeft = this.maxChanges - this.changesDoneToday;
    this.userPremiumLevel = parseInt(userData.Suscripcion);
    // TODO eliminate
    // this.userPremiumLevel = service.userPremiumLevel = parseInt(4);
    this.registrationDate = userData.FechaAlta;
    this.promoCode = userData.CodigoParaAmigos;
    this.defaultCurrency = userData.Currency;
    this.getAreaConfiguration(userData.MyAreaTipoOferta, userData.MyAreaHabitaciones, userData.RadioZona, userData.Dat_NumAlojamientos);
    this.getCurrentCurrency();
  };

  saveUserDataV2(userData) {
    this.uuid = userData.uuid;
    this.clientId = userData.idCliente;
    this.deviceId = userData.idDispositivo;
    this.propertyId = userData.idAlojamiento;
    this.areaId = userData.idZona;
    this.selectedPropertyName = userData.nombre;
    this.maxChanges = parseInt(userData.cambiosMaximos);
    this.changesDoneToday = parseInt(userData.cambiosHechosHoy);
    this.changesLeft = this.maxChanges - this.changesDoneToday;
    this.userPremiumLevel = parseInt(userData.suscripcion);
    // TODO eliminate
    // this.userPremiumLevel = service.userPremiumLevel = parseInt(4);
    this.registrationDate = userData.fechaAlta;
    this.promoCode = userData.codigoParaAmigos;
    this.defaultCurrency = userData.currency;
    this.getAreaConfiguration(userData.myAreaTipoOferta, userData.myAreaHabitaciones, userData.radioZona, userData.dat_NumAlojamientos);
    this.getCurrentCurrency();
  };

  getAreaConfiguration(propertyTypes: string, propertyRooms: string, radius: number, numberOfProperties: number){
    this.areaConfiguration = {
      propertyTypes: {
        entireHome: false,
        privateRoom: false,
        sharedRoom: false
      },
      propertyRooms: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      radius: 0,
      numberOfProperties: 0
    };

    if (propertyTypes.indexOf('Entire home/apt') > -1 ){
      this.areaConfiguration.propertyTypes.entireHome = true;
    }
    if (propertyTypes.indexOf('Private room') > -1 ){
      this.areaConfiguration.propertyTypes.privateRoom = true;
    }
    if (propertyTypes.indexOf('Shared room') > -1 ){
      this.areaConfiguration.propertyTypes.sharedRoom = true;
    }
    if (propertyRooms.indexOf('0') > -1 ){
      this.areaConfiguration.propertyRooms[0] = true;
    }
    if (propertyRooms.indexOf('1') > -1 ){
      this.areaConfiguration.propertyRooms[1] = true;
    }
    if (propertyRooms.indexOf('2') > -1 ){
      this.areaConfiguration.propertyRooms[2] = true;
    }
    if (propertyRooms.indexOf('3') > -1 ){
      this.areaConfiguration.propertyRooms[3] = true;
    }
    if (propertyRooms.indexOf('4') > -1 ){
      this.areaConfiguration.propertyRooms[4] = true;
    }
    if (propertyRooms.indexOf('more than 4') > -1 ){
      this.areaConfiguration.propertyRooms[5] = true;
    }
    this.areaConfiguration.radius = radius;
    this.areaConfiguration.numberOfProperties = numberOfProperties;

    return this.areaConfiguration;
  };

  getCurrentCurrency(){
/*    this.settings.getValue('currency').then((currency) => {
      this.currentCurrency = currency;
    });*/
  }

  checkUserIsSuscribed = function () {
    return this.userPremiumLevel > 0;
  };
}
