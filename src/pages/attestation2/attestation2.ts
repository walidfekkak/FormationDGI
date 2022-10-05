import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoginPage} from '../login/login'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-attestation2',
  templateUrl: 'attestation2.html',
})
export class Attestation2Page {

  email : string = '';
  fileTransfer: FileTransferObject;
  error_String: any;

  constructor(public translateService:TranslateService,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  	public api: Api, public apiNative: ApiNative , public user: User,private toastCtrl:ToastController ,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener) {
      this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
        this.error_String = value;
       });
    console.log('innn attestation2')
  }

  ionViewDidLoad() {
  }

  generate(){
  	/*const headers = new Headers();
  	headers.append('token', this.user.token);

    headers.append('username', this.user.username);
  	let body = { idFiscal : this.user._user.identifiantFiscal, 
                 //numTp : '111',
                 email: this.email };


    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('bulletinIF', body, options, 'AttestationCA/rest').map(resp => resp.json());*/

    const headers = new Headers();

    let body = { 
      idFiscal: this.user._user.identifiantFiscal
    };

    const options = new RequestOptions({headers: headers, params : body});


    let seq = this.api.getAttestation('verifieAttestationBulletin', body, options, 'attestations/rest').map(resp => resp.json());

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


    let url = this.api.getUrl('bulletinIF', 'attestations/rest');
    url += '?idFiscal=1000003';//+ this.user._user.identifiantFiscal ;// + '&email=' + this.email;
    // url = "http://www.africau.edu/images/default/sample.pdf";
    console.log(url);
    //window.open(url,'_system','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(url, this.file.dataDirectory + 'bulletinIF.pdf').then((entry) => {
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
