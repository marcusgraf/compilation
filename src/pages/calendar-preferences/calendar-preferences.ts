import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Settings} from "../../providers/settings";

/**
 * Generated class for the CalendarPreferencesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar-preferences',
  templateUrl: 'calendar-preferences.html',
})
export class CalendarPreferencesPage {
  form: FormGroup;
  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    private settings: Settings
  ) {

    this.form = formBuilder.group({
      showOccupancy: false,
      showRecommendations: true,
      showMinimumStay: false,
      showPosition: false
    });

    this.settings.load().then((values) => {
      for (let key in this.form.value){
        let value = values[key];
        if (value !== undefined){
          this.form.value[key] = value;
        }
      }
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);  }
}
