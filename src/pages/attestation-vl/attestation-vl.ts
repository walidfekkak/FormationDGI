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
import { ExtraLocaleDataIndex } from '@angular/common/src/i18n/locale_data';


@IonicPage()
@Component({
  selector: 'page-attestation-vl',
  templateUrl: 'attestation-vl.html',
})
export class AttestationVlPage {

  email : string = '';
  numTH : string = '15430659';

  fileTransfer: FileTransferObject = null;
  error_String: any;
  MSSG_INDISPONIBLE: any;

  constructor(public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  	public api: Api, public apiNative: ApiNative , public user: User,
    private transfer: FileTransfer, private file: File,
    private fileOpener: FileOpener, private toastCtrl:ToastController
 ,public translateService:TranslateService ) {


  

  this.translateService.get('MSSG_INDISPONIBLE').subscribe((value) => {
    this.MSSG_INDISPONIBLE = value;
   });

  this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
    this.error_String = value;
   });
 }

  ionViewDidLoad() {
  }

  generate(){

    if(!this.numTH ){
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
      ifu: "40393781",// this.user._user.identifiantFiscal,
      numTH: this.numTH
    };

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.getAttestation('demandeAttestationVL', body, options, 'attestations/rest').map(resp => resp.json());
    // url_check += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;

    seq.subscribe((res: any) => {

      
      console.log(res);
      console.log(res.status_code);
      console.log(res.message);
      var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

      loadingIndicator.present();

  if (res.message != null)    {      

     let pdfID = res.message;


    let url ='https://attestation-qualif.tax.gov.ma/attestations/rest/TelechargerAttestationExoP?pdfID='+pdfID;
    // window.open(url,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

    console.log(url);
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationVL.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.fileOpener.open(entry.toURL(), 'application/pdf')
      
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
      loadingIndicator.dismiss();
    }, (error) => {
      // handle error
      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present(); 
    });


       pdfID = "";
      seq.subscribe((res: any) => {
        console.log('AttestationExoP res');
        console.log(res);
        if(res.status_code == 302){
          pdfID = res.message;  
  
          var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
            showBackdrop:true,
            enableBackdropDismiss :true
          });
          loadingIndicator.onDidDismiss(data => {  
              console.log("DISMISSED LOADING pdf telecharger");
          });
          loadingIndicator.present();
          console.log('pdfID')
          console.log(pdfID)

   
          // let url = this.api.getUrl('TelechargerAttestationExoP', 'attestations/rest');
          // url += '?pdfID='+pdfID;

          let url ='https://attestation-qualif.tax.gov.ma/attestations/rest/TelechargerAttestationExoP?pdfID='+pdfID;
          // window.open(url,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

          console.log(url);
          this.fileTransfer= this.transfer.create();
          this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationVL.pdf').then((entry) => {
            console.log('download complete: ' + entry.toURL());
            this.fileOpener.open(entry.toURL(), 'application/pdf')
            
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
            loadingIndicator.dismiss();
          }, (error) => {
            // handle error
          });
        }
        if(res.status_code == 404){
          let toast = this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();  
          return;
        }

        else {


          let toast = this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();  
          return;
      
        }
       
    //}
      }, err => {  
        console.log(err);
        console.log(err.message)
        let splittedErrorMsg = err.message.split('||');
        let err_status = splittedErrorMsg[0]
        let err_msg = splittedErrorMsg[1]
        console.log(err_msg)
  
        if(err_status == 404){
          console.log('inside')
          let toast = this.toastCtrl.create({
            message: "bo",
            duration: 4000,
            position: 'bottom'
          });
          toast.present();  
        }
        if(err_status == 401 && err_msg.indexOf('CID-AT0001') != -1){
          console.log('inside')
          let toast = this.toastCtrl.create({
            message: "",
            duration: 4000,
            position: 'bottom'
          });
          toast.present();  
        }
        if(err_status == 401 && err_msg.indexOf('CID-AT0003')  != -1){
          // this.prefill_titre_foncier_with_details()
          // this.data_checked_but_not_valid = true
          let toast = this.toastCtrl.create({
            message: "",
            duration: 4000,
            position: 'bottom'
          });
          toast.present();  
        }
      });
  }
  else {
    loadingIndicator.dismiss();
    let toast = this.toastCtrl.create({
      message: this.MSSG_INDISPONIBLE,
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

  generateNEW(){

    if(!this.numTH ){
      let toast = this.toastCtrl.create({
        message: "Veuillez indiquer le numéro de la taxe professionnelle",
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
      numTP: this.numTH
    };

    const options = new RequestOptions({headers: headers, params : body});


      var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

      loadingIndicator.present();

  
      let url = this.api.getUrl('attestationTP', 'attestations/rest');
      url += '?idFiscal=' +this.user._user.identifiantFiscal+'&numTp=' + this.numTH;//+ '&email=' + this.email;
      this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationTP.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
        loadingIndicator.dismiss();
    }, (error) => {
      // handle error
    });
  

    loadingIndicator.dismiss();

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


