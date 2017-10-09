import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';

import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {StoreServiceProvider} from "../../providers/store-service/store-service";
import {User} from "../../models/user";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  user: User;
  daysToTest: any;

  subSettings: any = SettingsPage;

  currencies: {}[];

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public userService: UserServiceProvider,
    public storeService: StoreServiceProvider,
  ) {
    this.user = this.userService.currentUser;
    this.daysToTest = { value: (7 - this.user.seniority)};
  }

  _buildForm() {
    let group: any = {
      language: [this.options.language],
      currency: [this.options.currency],
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.translate.use(v.language);
      this.settings.currentCurrency = v.currency;
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    });

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.pageTitle = event.translations['SETTINGS_TITLE'];
    });

    this.userService.userChanged.subscribe((user) => {
      this.user = user;
      this.daysToTest = { value: (7 - this.user.seniority)};
    });
  }

  subscribe(){
    this.storeService.subscribe();
  }
}
