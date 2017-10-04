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
    public userService: UserServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.platform.ready().then(() => {
      this.createHeaders().then(() =>{
        this.initialised = true;
        this.initialisedChanged.next(this.initialised);
        this.get('Currencies').subscribe();
      });
    });
  }

  createHeaders(){
    return this.getUUID().then((uuid) => {
      this.headers = new Headers();
      this.headers.append('X-Vayoo-DeviceId', uuid);
      this.headers.append('X-VayooClient-Version', window.btoa(this.appVersion));
      this.requestOptions = new RequestOptions({ headers: this.headers });
    })
  }

  getUUID() {
    return this.settingsService.load().then((settings) => {
      if (settings && settings.UUID !== "undefined") return settings.UUID;
      else {
        let tempUUID: string = this.createUUID();
        this.settingsService.setValue("UUID", tempUUID);
        return tempUUID;
      }
    });
  }

  createUUID() {
    if (this.platform.is('cordova')){
      return this.device.uuid;
    }
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
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
