import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-infouser',
  templateUrl: 'infouser.html',
})
export class InfouserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfouserPage');
  }

}
