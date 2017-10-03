import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';
import { UserServiceProvider } from "../user-service/user-service";
import { LoadingController, Platform } from "ionic-angular";
import "rxjs/add/operator/do";
import "rxjs/add/operator/finally";
import { Settings } from "../settings";
import { Subject } from "rxjs/Subject";

@Injectable()
export class VayooApiServiceProvider {
  url: string = 'https://vayooforhostswebapi-v2.azurewebsites.net/api/';
  headers: Headers;
  requestOptions: RequestOptions;
  appVersion: string = '3.0.0';
  initialised: boolean = false;
  initialisedChanged = new Subject<boolean>();

  constructor(
    private platform: Platform,
    private device: Device,
    private settingsService: Settings,
    public http: Http,
    private userService: UserServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.platform.ready().then(() => {

      this.headers = new Headers();
      this.headers.append('X-Vayoo-DeviceId', this.getUuid());
      this.headers.append('X-VayooClient-Version', window.btoa(this.appVersion));

      this.requestOptions = new RequestOptions({ headers: this.headers });
      this.initialised = true;
      this.initialisedChanged.next(this.initialised);
      this.get('Currencies').subscribe(
        (data: { currencies: {}[] }) => {
          this.settingsService.currencies = data.currencies;
        }
      );
    });
  }

  getUuid(){
    if (this.platform.is('cordova')){
      return this.device.uuid;
    }else{
      return 'kadhfiu427938472';
    }
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

    if (params) {
      for (let k in params) {
        p.set(k, encodeURIComponent(params[k]));
      }

    }
    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;

    loading.present();

    return this.http.get(this.url + endPoint, this.requestOptions)
      .map(
      (response: Response) => {
        const data = response.json();

        if (data.hasOwnProperty('profile')) {
          this.userService.saveUser(data.profile);
        }

        return data;
      }
      )
      .finally(() => loading.dismiss()
      );
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    return this.http.post(this.url + endpoint, body, this.requestOptions)
      .map(
      (response: Response) => response.json())
      .finally(() => loading.dismiss()
      );
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    return this.http.put(this.url + endpoint, body, this.requestOptions)
      .map((response: Response) => response.json())
      .finally(() => loading.dismiss()
      );
  }

  delete(endpoint: string, options?: RequestOptions) {
    const loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    loading.present();
    return this.http.delete(this.url + endpoint, this.requestOptions).finally(() => loading.dismiss());
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + endpoint, body, this.requestOptions);
  }
}
