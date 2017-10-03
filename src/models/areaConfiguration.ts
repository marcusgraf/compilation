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
