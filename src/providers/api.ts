import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';
import { UserServiceProvider } from "./user-service/user-service";
import { LoadingController, Platform } from "ionic-angular";
import "rxjs/add/operator/do";
import {VayooApiServiceProvider} from "./vayoo-api-service/vayoo-api-service";

@Injectable()
export class Api {
  url: string = 'https://bocalls1.azurewebsites.net/jCall.aspx';
  urlV2: string = 'https://vayooforhostswebapi-v2.azurewebsites.net/api/';
  fixedParams: object;
  headers: Headers;
  requestOptions: RequestOptions;
  appVersion: string = '3.0.0';

  constructor(
    private platform: Platform,
    private device: Device,
    public http: Http,
    private userService: UserServiceProvider,
    private loadingCtrl: LoadingController,
    private vayooApiService: VayooApiServiceProvider,
  ) {
/*    this.platform.ready().then(() => {
      this.fixedParams = {
       uuid: this.vayooApiService.getUUID(),
       version: window.btoa(this.appVersion),
       // timeout: canceler.promise
      };
    });*/

  }

  get(endPoint: string, params?: any, options?: RequestOptions) {


    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    let p = new URLSearchParams();
    p.set('pgn', endPoint);
    for (let k in this.fixedParams) {
      p.set(k, this.fixedParams[k]);
    }

    if (params) {
      for (let k in params) {
        p.set(k, params[k]);
      }

    }
    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;

    loading.present();

    return this.http.get(this.url, options)
      .map(
      (response: Response) => {
        const data = response.json();
        if (data[0] === 0) {
          if (data[5]) {
            // this.userService.saveUserData(data[5][0]);
          }
          return data[1];
        }
        if (data[0] === 1) {
          return data[1];
        }
      }
      )
      .do((res: Response) => loading.dismiss()
      );
  }

  init() {
    return this.get('jInicio', { nida: '', lng: 'ES' });
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, this.requestOptions);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, this.requestOptions);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, this.requestOptions);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, this.requestOptions);
  }

}
