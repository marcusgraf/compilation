import construct = Reflect.construct;
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
    // TODO eliminate
    // this.userPremiumLevel = service.userPremiumLevel = parseInt(4);
    this.registrationDate = userData.fechaAlta;
    this.promoCode = userData.codigoParaAmigos;
    this.defaultCurrency = userData.currency;
    this.areaConfiguration = new AreaConfiguration(userData.myAreaTipoOferta, userData.myAreaHabitaciones, userData.radioZona, userData.dat_NumAlojamientos);
  }

  checkUserIsSuscribed = function () {
    return this.userPremiumLevel > 0;
  };
}

export class AreaConfiguration{
  propertyTypes: PropertyTypes = {
    entireHome: false,
    privateRoom: false,
    sharedRoom: false,
  };

  propertyRooms: PropertyRooms = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  };
  radius: number = 0;
  numberOfProperties: number = 0;

  constructor(
    propertyTypes: string,
    propertyRooms: string,
    radius: number,
    numberOfProperties: number
  ){
    this.getPropertyTypes(propertyTypes);
    this.getPropertyRooms(propertyRooms);
    this.radius = radius;
    this.numberOfProperties = numberOfProperties;
  }

  getPropertyTypes(propertyTypes){
    if (propertyTypes.indexOf('Entire home/apt') > -1 ){
      this.propertyTypes.entireHome = true;
    }
    if (propertyTypes.indexOf('Private room') > -1 ){
      this.propertyTypes.privateRoom = true;
    }
    if (propertyTypes.indexOf('Shared room') > -1 ){
      this.propertyTypes.sharedRoom = true;
    }
  }

  getPropertyRooms(propertyRooms){
    if (propertyRooms.indexOf('0') > -1 ){
      this.propertyRooms[0] = true;
    }
    if (propertyRooms.indexOf('1') > -1 ){
      this.propertyRooms[1] = true;
    }
    if (propertyRooms.indexOf('2') > -1 ){
      this.propertyRooms[2] = true;
    }
    if (propertyRooms.indexOf('3') > -1 ){
      this.propertyRooms[3] = true;
    }
    if (propertyRooms.indexOf('4') > -1 ){
      this.propertyRooms[4] = true;
    }
    if (propertyRooms.indexOf('more than 4') > -1 ){
      this.propertyRooms[5] = true;
    }
  }
}

interface PropertyTypes{
  entireHome: boolean,
  privateRoom: boolean,
  sharedRoom: boolean,
}

interface PropertyRooms{
  0: boolean,
  1: boolean,
  2: boolean,
  3: boolean,
  4: boolean,
  5: boolean
}
