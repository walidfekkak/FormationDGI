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
  selector: 'page-attestation-cae',
  templateUrl: 'attestation-cae.html',
})
export class AttestationCaePage {

  email : string = '';
  fileTransfer: FileTransferObject;

  years : any = [];
  selectedYears : any = [];
  error_String: any;

  constructor( public translateService:TranslateService ,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  	public api: Api, public apiNative: ApiNative , public user: User,private toastCtrl:ToastController ,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener) {
    console.log('innn attestation3')
    var currentYear = (new Date().getFullYear());
    for(var y = currentYear; y > currentYear - 10; y--){
      this.years.push(y);
    }

    this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
      this.error_String = value;
     });
  }

  ionViewDidLoad() {
  }


  generate(){

 

    this.fileTransfer= this.transfer.create();
  	const headers = new Headers();
  
    let body = { 
     // ifu: "40393781",// this.user._user.identifiantFiscal,
      "listAnnees" : this.selectedYears
    };

    let data = {
    
      "listAnnees": this.selectedYears
  };

  let bod = new URLSearchParams();

  bod.set('listAnnees', this.selectedYears);

    console.log(this.selectedYears);

    const options = new RequestOptions({headers: headers, params : bod.toString()});

    let seq = this.api.getAttestation('demandeAttestationCAE?ifu=18768415&exercices='+this.selectedYears, bod.toString(), bod.toString(), 'attestations/rest').map(resp => resp.json());
    // url_check += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;

    console.log(seq);

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
    // let url = this.api.getUrl('TelechargerAttestationExoP', 'attestations/rest');
    // url += '?pdfID=' + pdfID;
    this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationExoP.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.fileOpener.open(entry.toURL(), 'application/pdf')
      
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
      loadingIndicator.dismiss();
      return;
    }, (error) => {
      // han   // handle error

      return;
          });


   
      seq.subscribe((res: any) => {
        console.log('AttestationExoP res');
        console.log(res);
        if(res.status_code != null){
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
        
          let url = this.api.getUrl('TelechargerAttestationExoP', 'attestations/rest');
          url += '?pdfID=' + pdfID
          this.fileTransfer.download(url, this.file.dataDirectory + 'attesttationExoP.pdf').then((entry) => {
            console.log('download complete: ' + entry.toURL());
            this.fileOpener.open(entry.toURL(), 'application/pdf')
            
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
            loadingIndicator.dismiss();
          }, (error) => {
            // handle error
          });
        }
        if(res.status == 404){
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
            message: res[0].message,
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
      message: res[0].message,
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

  generateOL(){
  

    console.log(this.selectedYears)

    if (this.selectedYears.length == 0)
      {
			const toast = this.toastCtrl.create({
		      message: this.error_String,
		      duration: 3000
		    });
		    toast.present();
		    return;
    }
    
    const headers = new Headers();

    let body = { 
      idFiscal: this.user._user.identifiantFiscal,
      exercices : this.selectedYears
    };

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.getAttestation('verifieAttestationRevenu', body, options, 'attestations/rest').map(resp => resp.json());

    seq.subscribe((res: any) => {
      console.log(res.status_code);
      var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

      // loadingIndicator.present();

  
  if (res.status_code == 302)    {  

      
    let url = this.api.getUrl('demandeAttestationCAE', 'attestations/rest');
   url += '?idFiscal=18768415';//+ this.user._user.identifiantFiscal +"&exercices="+this.selectedYears;// + '&email=' + this.email;
   

    console.log(url);
    //window.open(url,'_system','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(url, this.file.dataDirectory + 'revenu.pdf').then((entry) => {
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
      loadingIndicator.dismiss();
    });
  }
  }, err => {
    console.error('ERROR', err);
  });
}
  


  generateOLD(){
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
      idFiscal: 2221569//this.user._user.identifiantFiscal
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
    url += '?idFiscal='+ 2221569;//this.user._user.identifiantFiscal ;// + '&email=' + this.email;
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
