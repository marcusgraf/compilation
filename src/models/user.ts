import {AreaConfiguration} from "./areaConfiguration";

export class User {
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
  areaConfiguration: AreaConfiguration;
  mail: string = '';
  searchKeyword: string;
  seniority: any;
  active: boolean;

  constructor(userData) {
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
    this.searchKeyword = userData.sitio;
    // TODO eliminate
    // this.userPremiumLevel = service.userPremiumLevel = parseInt(4);
    this.registrationDate = userData.fechaAlta;
    this.promoCode = userData.codigoParaAmigos;
    this.defaultCurrency = userData.currency;
    this.areaConfiguration = new AreaConfiguration(userData.myAreaTipoOferta, userData.myAreaHabitaciones, userData.radioZona, userData.dat_NumAlojamientos);
    this.calculateSeniority();
    this.active = userData.activo;
  }

  checkUserIsSuscribed = function () {
    return this.userPremiumLevel > 0;
  };

  calculateSeniority = function () {
    let registrationDate = new Date();
    registrationDate.setFullYear(parseInt(this.registrationDate.substr(0, 4)));
    registrationDate.setMonth(parseInt(this.registrationDate.substr(5,7)));
    registrationDate.setDate(parseInt(this.registrationDate.substr(7,9)));
    let now = new Date;
    const difference = now.valueOf() - registrationDate.valueOf();
    this.seniority = Math.floor(difference / 86400000);
  };

  trialIsFinished(){
    return this.seniority > 7;
    // return false;
    // return true;
  }
}

