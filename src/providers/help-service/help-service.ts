import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Api} from "../api";
import {TranslateService} from "@ngx-translate/core";
import {UserServiceProvider} from "../user-service/user-service";
import {VayooApiServiceProvider} from "../vayoo-api-service/vayoo-api-service";

@Injectable()
export class HelpServiceProvider {
  helpCatalog = {
    'cost': '115002596545',
    'what_is': '115002571449',
    'how_calculate_price': '115002572309',
    'update_frequency': '115002572369',
    'recommendations_for_already_changed_prices': '115002596385',
    'see_old_prices': '115002596405',
    'cancel_this': '115002596585',
    'available_countries': '115002572869',
    'ask': '115002572889',
    'monthly_revenue': '115002596625',
    'booking_probability': '115002596645',
    'economic_performance': '115002596245',
    'price_increase_opportunities': '115002572929',
    'unfindable_days': '115002572969',
    'airbnb_listing_link': '115002571729',
    'why_link_account': '115002595665',
    'privacy_policy': '115001886425',
    'legal_notice': '115002627849',
    'terms_and_conditions': '115002627849',
    'minimum_acceptable_price': '115002596745',
    'problems_linking_account': '115003177809',
    'why_search_position': '115002596065',
    'bookings': '115002596165',
    'change_price': '115003826109',
    'performance_ranking': '115000434274',
    'area_preferences': '115002572389',
    'how_find_property': '115002571729',
    'link_account': '115003177809',
    'find_property_by_id': '115000433594',
    'monthly_calendar': '115000578093',
    'minimum_stay': '115000905153',
    'average_area_income': '115000969414',
    'minimum_stay_day': '115000711994',
  };

  loginCodes = {
    '-1': 'No ha dado tiempo a hacer login',
    0: 'Todo correcto',
    1: 'Ya estaba reservado',
    2: 'Ya tenia ese precio puesto',
    3: 'Ignorar porque una operacion mas reciente la hace obsoleta',
    4: 'Ignorar porque hace demasiado tiempo de esa operación',
    10: 'Precio cambiado',
    11: 'Login es correcto',
    12: 'Propiedades correctamente asociadas',
    13: 'Estancia minima correctamente cambiadas',
    101: 'Error yendo al calendario',
    102: 'Error cambiando de mes',
    103: 'Error porque la propiedad no es suya',
    104: 'Error el precio guardado no es el que se queria',
    105: 'Error al poner le precio en la celda',
    106: 'Error al hacer login',
    107: 'Error al hacer login por pop up de verificacion',
    108: 'Email o contraseña no valido',
    109: 'Email o contraseña no valido',
    110: 'No es propietario',
    111: 'Error al cambiar la estancia minima',
    112: 'Email no valido',
    113: 'No ha sido posible hacer login',
    114: 'Error por verificacion de cuenta',
    115: 'Error contraseña no valida aviso facebook',
    116: 'Error el usuario se registro con google',
    117: 'Error el usuario se registro con facebook',
    118: 'El usuario no tiene anuncios publicados actualmente',
    119: 'La contraseña es inferior a 8 caracteres',
    122: 'UsuarioMetePropiedadAirbnbQueNoExisteoNoEstaPublicadaEnEsteMomento',
    123: 'UsuarioMetePropiedadAirbnbQueExistePeroNoTenemosEnVayooTodavia',
    124: 'UsuarioVinculaCuentaPeroNoTenemosEnVayooTodaviaNingunaPropiedadDeLasSuyas',
    140: 'Pantalla de aprobacion TOS',
    503: 'ErrorApiAirbnbNoDisponible'
  };

  loginUserMessages = {
    106: '<p>We are sorry. We haven´t been able to verify your account. Please make sure you have added your details correctly or check out <a (click)="showHelp(\'problems_linking_account\')">FAQ</a>. If the problem persists, you can <a (click)="goTo(\'help\')">write us</a>.</p>',
    108: '<p>Your email address or your password is incorrect. Please make sure you have added your details correctly or check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a>.  If the problem persists, you can <a (click)="goTo(\'help\')">write us</a>.</p>',
    109: '<p>Your email address or your password is incorrect. Please make sure you have added your details correctly or check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a>.  If the problem persists, you can <a (click)="goTo(\'help\')">write us</a>.</p>',
    110: '<p>You haven´t become an Airbnb hosts yet. Please add a property before your link your account.See how to add a property in Airbnb <a (click)="AbrirWindow(\'https://www.airbnb.com/host/homes\')">here</a>. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    112: '<p>The email you have introduced doesn’t exist. Remember you have to use the same email you used to sign up in Airbnb. Please make sure you have added your details correctly or create and Airbnb account. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    113: '<p>We are sorry. We haven´t been able to verify your account. Please make sure you have added your details correctly. If you have any question check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    115: '<p>We are sorry. We haven´t been able to connect with your Airbnb account because you use your Facebook account to enter Airbnb.") </p><p>You\'ll need an Airbnb login and password to sign up for Vayoo. It\'s simple to create a password: <a (click)="AbrirWindow(\'https://www.airbnb.com/help/article/76/how-do-i-reset-my-password\')">here are instructions from Airbnb</a>.</p><p>If you have any question check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    116: '<p>We are sorry. We haven´t been able to connect with your Airbnb account because you use your Google account to enter Airbnb.</p><p>You\'ll need an Airbnb login and password to sign up for Vayoo. It\'s simple to create a password: <a (click)="AbrirWindow(\'https://www.airbnb.com/help/article/76/how-do-i-reset-my-password\')">here are instructions from Airbnb</a>.</p><p>If you have any question check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    117: '<p>We are sorry. We haven´t been able to connect with your Airbnb account because you use your Facebook account to enter Airbnb.</p><p>You\'ll need an Airbnb login and password to sign up for Vayoo. It\'s simple to create a password: <a (click)="AbrirWindow(\'https://www.airbnb.com/help/article/76/how-do-i-reset-my-password\')">here are instructions from Airbnb</a>.</p><p>If you have any question check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    118: '<p>Your Airbnb listing is in Snooze Mode or Deactivated. Please reactivate your listing in Airbnb and retry again. See how to activate your listing <a (click)="AbrirWindow(\'https://www.airbnb.com/help/article/883/how-do-i-activate-my-listing\')">here</a>. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    119: '<p>The password you entered has less than 8 characters. Please make sure you have added your details correctly or check out <a (click)="showHelp(\'problems_linking_account\')">FAQ</a>. You can also <a (click)="goTo(\'help\')">write us</a>.</p>',
    // 120: '<p>The password you entered has less than 8 characters. Please make sure you have added your details correctly or check out <a (click)="showHelp(\'problems_linking_account\')">FAQ</a>. You can also <a (click)="goTo(\'help\')">write us</a>.</p>',
    122: '<p>Your Airbnb listing is in Snooze Mode or Deactivated. Please reactivate your listing in Airbnb and retry again. See how to activate your listing <a (click)="AbrirWindow(\'https://www.airbnb.com/help/article/883/how-do-i-activate-my-listing\')">here</a>. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">write us</a>.</p>',
    123: '<p>We are sorry! Our server hadn\'t found your property yet. In less than an hour, your property will be available. We’ll send you a notification. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">send us a message</a>.</p>',
    124: '<p>Our apologies, none of your properties have been monitored yet. Now you have tried to link your account, our servers will find them and notify you in less than an hour. Sorry for the inconvenience. Meanwhile, you can check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">send us a message</a>.</p>',
    503: '<p>We haven´t been able to verify your account because Airbnb’s site is experiencing some problems. Please try again in a while. You can also check out our <a (click)="showHelp(\'problems_linking_account\')">FAQ</a> or <a (click)="goTo(\'help\')">send us a message</a>.</p>'
  };

  agents = {
    support: 2494830835,
    alejandro: 10234386825
  };

  errorCounter = {};

  constructor(
    private api: Api,
    private userService: UserServiceProvider,
    public translateService: TranslateService,
    public vayooApiService: VayooApiServiceProvider,
  ) {
  }

  getArticle(name) {
    let params = {
      url: 'https://vayoo.zendesk.com/api/v2/help_center/en-us/articles/' + this.helpCatalog[name] + '.json',
      method: "GET"
    };


  };

  sendMacro(macroName, email) {
    console.log('helpService -> sending macro');
    email = email !== '' ? email : 'app@vayoo.com';

    let data = {
      "RequesterName": 'User ' + this.userService.clientId,
      "Email": email,
      "Subject": "Login Problem",
      "Body": "this is a body",
      "AssigneeId": this.agents.alejandro,
      "submitterId": this.agents.alejandro,
      "topicId": String(macroName),
      "CustomFields": [
        {"id": 114095370854, "value": this.userService.clientId},
        {"id": 114095370814, "value": this.userService.deviceId},
        {"id": 114095370874, "value": this.api.appVersion},
        {"id": 114095371034, "value": null},
        {"id": 114095371054, "value": this.translateService.currentLang},
        {"id": 114095371074, "value": 'app'},
        {"id": 114095371094, "value": ''},
        {"id": 114095371134, "value": "1"},
        {"id": 45304509, "value": "1"}
      ]
    };

    let headers = {
      "Accept-Language": this.translateService.currentLang
    };
  };

  sendTicket(email, text, day?) {
    console.log('helpService -> sending ticket');
    email = email !== '' ? email : 'app@vayoo.com';
    let assignee_id = this.agents.alejandro;
    text = typeof text !== 'undefined' ? text : 'El usuario no ha escrito nada';
    let extra_data_string = '';

    let data = {
      "RequesterName": 'User ' + this.userService.clientId,
      "Email": email,
      "Subject": text,
      "Body": text,
      "AssigneeId": assignee_id,
      "topicId": null,
      "CustomFields": [
        {"id": 114095370854, "value": this.userService.clientId},
        {"id": 114095370814, "value": this.userService.deviceId},
        {"id": 114095370874, "value": this.api.appVersion},
        {"id": 114095371034, "value": this.userService.propertyId},
        {"id": 114095371054, "value": this.translateService.currentLang},
        {"id": 114095371074, "value": 'app'},
        {"id": 114095371094, "value": ''},
        {"id": 114095371114, "value": day},
        {"id": 114095371134, "value": this.userService.areaId},
        {"id": 45304509, "value": this.userService.mail}
      ]
    };
    let headers = {
      'Accept-Language': this.translateService.currentLang
    };

    return this.vayooApiService.post('Tickets', data);

  };

  sendError(name, email, text, day) {
    console.log('helpService -> sending error');
    name = typeof name !== 'undefined' ? name : 'User ' + this.userService.clientId;
    email = email !== '' ? email : 'app@vayoo.com';
    let assignee_id = this.agents.support;
    text = typeof text !== 'undefined' ? text : 'El usuario no ha escrito nada';
    let extra_data_string = '';


    let config = {
      method: "POST",
      url: ("https://vayooforhostswebapi.azurewebsites.net/tickets"),
      dataType: 'json',
      contentType: 'application/json',
      data: {
        "RequesterName": 'User ' + this.userService.clientId,
        "Email": email,
        "Subject": text,
        "Body": text,
        "AssigneeId": assignee_id,
        "topicId": null,
        "CustomFields": [
          {"id": 114095370854, "value": this.userService.clientId},
          {"id": 114095370814, "value": this.userService.deviceId},
          {"id": 114095370874, "value": this.api.appVersion},
          {"id": 114095371034, "value": this.userService.propertyId},
          {"id": 114095371054, "value": this.translateService.currentLang},
          {"id": 114095371074, "value": 'app'},
          {"id": 114095371094, "value": ''},
          {"id": 114095371114, "value": day},
          {"id": 114095371134, "value": this.userService.areaId},
          {"id": 45304509, "value": this.userService.mail}
        ]
      },
      headers: {
        'Accept-Language': this.translateService.currentLang
      }
    };

  };
}
