import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Property} from "../../models/property";
import {Subject} from "rxjs/Subject";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";

@Injectable()
export class PropertiesServiceProvider {
  private properties: Property[] = [];
  propertiesChanged = new Subject<Property[]>();

  constructor(
    private vayooApiService: VayooApiServiceProvider,
  ) {
    this.vayooApiService.initialisedChanged.subscribe((initialise) => {
      if (!initialise) return;
      this.fetchUserProperties().subscribe();
    });
  }

  updateUserProperties(properties){
    this.properties = properties.map((property) => new Property(property));
    this.propertiesChanged.next(this.properties.slice());
  }

  getUserProperties(){
    return this.properties.slice();
  }

  fetchUserProperties(){
    return this.vayooApiService.get('Accounts').map((properties) => this.updateUserProperties(properties.myListings));
  }

  addPropertyByAirbnbAccount(mail, password){
    return this.vayooApiService.put(
      'Accounts',
      {
        email: btoa(mail),
        password: btoa(password)
      }
    ).map((properties) => this.updateUserProperties(properties.myListings));
  }

  addPropertyByAirbnbId(id){
    return this.vayooApiService.put('MyListings', { listingIdOrUri: id }).map((properties) => this.updateUserProperties(properties.myListings));
  }

  deleteProperty(id) {
    return this.vayooApiService.delete('MyListings/' + id).subscribe(
      (resp) => {
        this.properties = this.properties.filter(property => property.id !== id);
        this.propertiesChanged.next(this.properties.slice());
      },
    );
  }

}
