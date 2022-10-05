import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ScanFormulairePage } from '../scan-formulaire/scan-formulaire';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-scan-attestation',
  templateUrl: 'scan-attestation.html',
})
export class ScanAttestationPage {

  	constructor(private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ScanAttestationPage');
  	}
	redirectFormulaire(){
  		this.navCtrl.push('VerifAttestationPage');
	}

}
