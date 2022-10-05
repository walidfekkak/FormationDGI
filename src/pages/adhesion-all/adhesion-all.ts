import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdhesionCpuPage } from '../adhesion-cpu/adhesion-cpu';
import { AdhesionPage } from '../adhesion/adhesion';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the AdhesionAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adhesion-all',
  templateUrl: 'adhesion-all.html',
})
export class AdhesionAllPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdhesionAllPage');
  }

  redirectAdhesion(){
    this.navCtrl.push(AdhesionPage);
  } 

  redirectAdhesionCPU(){
    this.navCtrl.push(AdhesionCpuPage);
  } 

}
