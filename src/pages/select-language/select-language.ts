import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-select-language',
  templateUrl: 'select-language.html',
})
export class SelectLanguagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, private platform: Platform) {
  }

  ionViewDidLoad() {
    
  }

  selectLang(lang){
  	this.translate.use(lang);
    this.navCtrl.push("LoginPage");

    if( lang == 'ar')
      this.platform.setDir('rtl', true)
    else
      this.platform.setDir('ltr', true)
  }

}
