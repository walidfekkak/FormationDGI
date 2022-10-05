import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  showChatbot = true
  enableFingerPrint = true;
  showAttestation1 = true;
  showAttestation2 = true;
  showAttestation3 = true;
  showAttestation4 = true;
  showAttestation5 = true;
  showAttestation6 = true;
  showAttestation7 = true;
  showAttestation8 = true;
  showAttestation9 = true;

  
  message_settings: any;
  

  constructor(public toastCtrl: ToastController,public translateService:TranslateService,public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public events: Events) {

    this.translateService.get('MESSAGE_SETTINGS').subscribe((value) => {
      this.message_settings = value;
     });

    this.storage.get('SHOW_CHATBOT').then((val) => {
      if(val == null) return;
      this.showChatbot = val;

    });

    this.storage.get('SETTINGS_FINGERPRINT_ENABLED').then((val) => {
      if(val == null) return;
      this.enableFingerPrint = val;
    });

    this.storage.get('show_attestation_1').then((val) => {
      if(val == null) return;
      this.showAttestation1 = val;
    });

    this.storage.get('show_attestation_2').then((val) => {
      if(val == null) return;
      this.showAttestation2 = val;
    });

    this.storage.get('show_attestation_3').then((val) => {
      if(val == null) return;
      this.showAttestation3 = val;
    });

    this.storage.get('show_attestation_4').then((val) => {
      if(val == null) return;
      this.showAttestation4 = val;
    });

    this.storage.get('show_attestation_5').then((val) => {
      if(val == null) return;
      this.showAttestation5 = val;
    });

    this.storage.get('show_attestation_6').then((val) => {
      if(val == null) return;
      this.showAttestation6 = val;
    });

    this.storage.get('show_attestation_7').then((val) => {
      if(val == null) return;
      this.showAttestation7 = val;
    });

    this.storage.get('show_attestation_8').then((val) => {
      if(val == null) return;
      this.showAttestation8 = val;
    });

    this.storage.get('show_attestation_9').then((val) => {
      if(val == null) return;
      this.showAttestation9 = val;
    });

   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');


  }

  submit(){
    if(this.showChatbot){
      window.document.getElementById('chatbot-logo').setAttribute("style", "display: block !important");
    }else{
      window.document.getElementById('chatbot-logo').setAttribute("style", "display: none !important");
    }

    this.storage.set('SHOW_CHATBOT', this.showChatbot)

    this.storage.set('SETTINGS_FINGERPRINT_ENABLED', this.enableFingerPrint)
    
    this.events.publish('show_attestation_1', this.showAttestation1)
    this.events.publish('show_attestation_2', this.showAttestation2)
    this.events.publish('show_attestation_3', this.showAttestation3)
    this.events.publish('show_attestation_4', this.showAttestation4)
    this.events.publish('show_attestation_5', this.showAttestation5)
    this.events.publish('show_attestation_6', this.showAttestation6)
    this.events.publish('show_attestation_7', this.showAttestation7)
    this.events.publish('show_attestation_8', this.showAttestation8)
    this.events.publish('show_attestation_9', this.showAttestation9)
   

    this.storage.set('show_attestation_1', this.showAttestation1)
    this.storage.set('show_attestation_2', this.showAttestation2)
    this.storage.set('show_attestation_3', this.showAttestation3)
    this.storage.set('show_attestation_4', this.showAttestation4)
    this.storage.set('show_attestation_5', this.showAttestation5)
    this.storage.set('show_attestation_6', this.showAttestation6)
    this.storage.set('show_attestation_7', this.showAttestation7)
    this.storage.set('show_attestation_8', this.showAttestation8)
    this.storage.set('show_attestation_9', this.showAttestation9)
    

    let toast = this.toastCtrl.create({
      message: this.message_settings,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();  
    
  }

  // showAttestation1(){
    redirect(pageName:string ='none', params = null,params1 = null ){
      if(pageName == 'none'){
          let toast = this.toastCtrl.create({
          message: this.message_settings,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();  
      }else if ( params != null ){
        console.log("here just");
        this.navCtrl.push(pageName,params);
      } else {
        this.navCtrl.setRoot(pageName,{},params1);
      }
    }

  // }

  logout(){
    //this.navCtrl.pop();
    this.navCtrl.push('LoginPage');
    // this.displayFooter = false;
  }


}
