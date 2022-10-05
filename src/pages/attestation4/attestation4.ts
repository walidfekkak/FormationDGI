import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Api, ApiNative, User } from '../../providers';
import { FileOpener } from '@ionic-native/file-opener';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoginPage} from '../login/login'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the Attestation4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attestation4',
  templateUrl: 'attestation4.html',
})
export class Attestation4Page {
  fileTransfer: FileTransferObject;

  check_soumission = false;

  constructor(public translateService:TranslateService,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
    public api: Api, public apiNative: ApiNative , public user: User,private toastCtrl:ToastController ,
    
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Attestation4Page');
  }

  soumission(){
    this.check_soumission = !this.check_soumission;
    console.log("check soumission : "+this.check_soumission);
  }


  generateOLD(){
  
    const headers = new Headers();

    let body = { 
      idFiscal: 32105251
      // idFiscal: this.user._user.identifiantFiscal
    };

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.getAttestation('verifieAttestationRF', body, options, 'attestations/rest').map(resp => resp.json());

    seq.subscribe((res: any) => {
      console.log(res.status_code);
      var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {       
          console.log("DISMISSED LOADING");
      });

      loadingIndicator.present();

  
  if (res.status_code == 302)    {  
    let url = this.api.getUrl('regulariteFiscale', 'attestations/rest');
    url += '?idFiscal=32105251';//+ this.user._user.identifiantFiscal  ;//this.user._user.identifiantFiscal ;// + '&email=' + this.email;
    // url = "http://www.africau.edu/images/default/sample.pdf";
    console.log(url);
    //window.open(url,'_system','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(url, this.file.dataDirectory + 'regularitefiscale.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        console.log('fileOpener: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        loadingIndicator.dismiss();
    }, (error) => {
      // handle error
      console.log(error);
    });
    

  } else {
    loadingIndicator.dismiss();
    let toast = this.toastCtrl.create({
      message: "Attestation introuvable !!",
      duration: 4000,
      position: 'bottom'
    });
    toast.present();  
    return;

  }
  
}, err => {
      console.error('ERROR', err);
    });
  }

  generate(){

    const headers = new Headers();

    let body = { 
      idFiscal: this.user._user.identifiantFiscal
    };

    const options = new RequestOptions({headers: headers, params : body});


      var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

    loadingIndicator.present();

    let url = this.api.getUrl('regulariteFiscale', 'attestations/rest');
    //url += '?idFiscal='+2221569;//this.user._user.identifiantFiscal ;// + '&email=' + this.email;
    url += '?idFiscal='+ this.user._user.identifiantFiscal ;// + '&email=' + this.email;

    console.log(url);
    //window.open(url,'_system','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(url, this.file.dataDirectory + 'regularitefiscale.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        console.log('fileOpener: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        //this.fileOpener.open(entry.toURL(), 'application/pdf')
        //.then(() => console.log('File is opened'))
        //.catch(e => console.log('Error opening file', e));
        loadingIndicator.dismiss();
    }, (error) => {
      // handle error
      console.log(error);
    });
  }

	logout(){
		//this.navCtrl.pop();
		this.navCtrl.push(LoginPage);
	  }

  redirect(pageName:string ='none', params = null,params1 = null ){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
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

}