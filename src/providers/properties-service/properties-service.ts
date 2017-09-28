import { Injectable } from '@angular/core';
import { Api } from '../api'
import 'rxjs/add/operator/map';
import {Day} from "../../models/day";
import {Property} from "../../models/property";
import {Platform} from "ionic-angular";
import {Subject} from "rxjs/Subject";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";

@Injectable()
export class PropertiesServiceProvider {
  private properties: Property[] = [];
  propertiesChanged = new Subject<Property[]>();

  constructor(
    private api: Api,
    private vayooApiService: VayooApiServiceProvider,
    private platform: Platform
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

  searchProperty(numpregunta, pais, adm1_id, adm2_id, adm3_id, adm4_id, tipooferta, rooms, camas, guests, booking, aireac, elevator){
    return this.api.get('jFiltrarPropiedades', {
      p1: numpregunta,
      p2: pais,
      p3: adm1_id,
      p4: adm2_id,
      p5: adm3_id,
      p6: adm4_id,
      p7: tipooferta,
      p8: rooms,
      p9: camas,
      p10: guests,
      p11: booking,
      p12: aireac,
      p13: elevator
    })
  }

  deleteProperty(id) {
    this.properties = this.properties.filter(property => property.id !== id);

    return this.api.get('jBorrarPropiedad', {ida: id}).subscribe(
      (resp) => {
        this.propertiesChanged.next(this.properties.slice());
      },
    );
  }

}
