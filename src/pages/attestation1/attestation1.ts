import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoginPage} from '../login/login'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()

@Component({
  selector: 'page-attestation1',
  templateUrl: 'attestation1.html',
})

export class Attestation1Page {

  email : string = '';
  
  numTP : string = '';

  fileTransfer: FileTransferObject = null;
  error_String: any;
  MSSG_INFO_TP: string;

  constructor(public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  
    
    public api: Api, public apiNative: ApiNative , public user: User,
  
    private transfer: FileTransfer, private file: File,
  
    private fileOpener: FileOpener, private toastCtrl:ToastController,public translateService: TranslateService) {
  

      

      this.translateService.get('MSSG_INFO_TP').subscribe((value) => {
        this.MSSG_INFO_TP = value;
       });

      this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
        this.error_String = value;
       });
    }

  ionViewDidLoad() {}

  generate(){

    if(!this.numTP ){
      let toast = this.toastCtrl.create({
        message: this.error_String,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    this.fileTransfer= this.transfer.create();
  	const headers = new Headers();
  
    let body = { 
      idFiscal: this.user._user.identifiantFiscal,
      numTP: this.numTP
    };

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.getAttestation('verifieAttestationTP', body, options, 'attestations/rest').map(resp => resp.json());
    // url_check += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;

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
      let url = this.api.getUrl('attestationTP', 'attestations/rest');
      // url += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;//+ '&email=' + this.email;
      url += '?idFiscal=1000003&numTP=32105251';// + this.numTP;//+ '&email=' + this.email;

      
      this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationTP.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
        loadingIndicator.dismiss();
    }, (error) => {
      // handle error
    });
  
  }
  else {
    loadingIndicator.dismiss();
    let toast = this.toastCtrl.create({
      message: this.MSSG_INFO_TP,
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

  logout(){
		//this.navCtrl.pop();
		this.navCtrl.push(LoginPage);
	  }
 
  }


