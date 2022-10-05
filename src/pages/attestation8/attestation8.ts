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
  selector: 'page-attestation8',
  templateUrl: 'attestation8.html',
})
export class Attestation8Page {

  email : string = '';
  fileTransfer: FileTransferObject;
  error_String: any;
  cni: string = "";
  nom: string ="";
  prenom: string= "";
  adresse: string ="";
  ville: string = "";
   ishidden:boolean = false;
  Saisie_String: any;
  EST_ELIGIBLE: string;
  NON_ELIGIBLE: string;
  isDisabled: boolean = false;
  NON_NOTAIRE: any;

  constructor(public translateService:TranslateService,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  	public api: Api, public apiNative: ApiNative , public user: User,private toastCtrl:ToastController ,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener) {
      this.translateService.get('ERREUR_3_MSG').subscribe((value) => {
        this.error_String = value;
       });

       this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
        this.Saisie_String = value;
       });

       this.translateService.get('EST_ELIGIBLE').subscribe((value) => {
        this.EST_ELIGIBLE = value;
       });

       this.translateService.get('NON_ELIGIBLE').subscribe((value) => {
        this.NON_ELIGIBLE = value;
       });

       this.translateService.get('NON_NOTAIRE').subscribe((value) => {
        this.NON_NOTAIRE = value;
       });
       

    console.log('innn attestation8')

   
  }

  ionViewDidLoad() {
  }

  verifier(){
    if(!this.cni ){
      let toast = this.toastCtrl.create({
        message: this.Saisie_String , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    const headers = new Headers();

    let body = { 
 
      ifu: this.user._user.identifiantFiscal,
      cni:this.cni

    };
    
    

    const options = new RequestOptions({headers: headers, params : body});

    var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

      loadingIndicator.present();

      let url = null;

    url = this.api.getUrl('AttestationExoTva', 'attestations/rest');
    // url += '?ifu='+ this.user._user.identifiantFiscal+"&cni="+this.cni;
        url += '?ifu=40393781&cni=U50493';

    
    //  url = this.api.getUrl('AttestationExoTva', 'attestations/rest');
    // url += '?ifu='+ this.user._user.identifiantFiscal+"&cni="+this.cni+"&nom="+this.nom+"&prenom="
    // +this.prenom+"&adresse="+this.adresse+"&ville="+this.ville ;
     console.log(url);
     let URLENCODE = encodeURI(url);
     let decod = decodeURIComponent(url);

     console.log("howa hada : "+decod);
     console.log("encoded one : "+URLENCODE);
   
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(URLENCODE, this.file.dataDirectory + 'AttestationExoTva.pdf').then((entry) => {
      
      console.log('fileOpener: ' + entry.toURL());
      this.fileOpener.open(entry.toURL(), 'application/pdf')
    
      loadingIndicator.dismiss();
    }, (error) => {
      // handle error
      console.log("into : "+error);
      loadingIndicator.dismiss();
      console.log("into 2 : "+error.body);

      if (error.body.search('EST_ELIGIBLE')  != -1 ) {

        loadingIndicator.dismiss();
         

        this.ishidden = true; 
        this.isDisabled = true;       
        let toast = this.toastCtrl.create({
          message: this.Saisie_String,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
        return;
      } else if 
      (error.body.search('NON_ELIGIBLE')  != -1 ) {

        let toast = this.toastCtrl.create({
          message: this.NON_ELIGIBLE,
          duration: 9000,
          position: 'bottom'
        });
        toast.present();  
        return;
      } else {
        loadingIndicator.dismiss();
        
        let toast = this.toastCtrl.create({
          message: this.NON_NOTAIRE,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
        return;

      }

    });


  }


  generate(){
  
    if(!this.nom ){
      let toast = this.toastCtrl.create({
        message: this.Saisie_String , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    if(!this.prenom ){
      let toast = this.toastCtrl.create({
        message: this.Saisie_String , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    if(!this.adresse ){
      let toast = this.toastCtrl.create({
        message: this.Saisie_String , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    if(!this.ville ){
      let toast = this.toastCtrl.create({
        message: this.Saisie_String , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    const headers = new Headers();

    let body = { 
 
      ifu: this.user._user.identifiantFiscal,
      cni:this.cni

    };
    
    

    const options = new RequestOptions({headers: headers, params : body});

    var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
      showBackdrop:true,
      enableBackdropDismiss :true});
      loadingIndicator.onDidDismiss(data => {
          
          console.log("DISMISSED LOADING");
      });

      loadingIndicator.present();

    //   https://attestation-qualif.tax.gov.ma/attestations/rest/AttestationExoTva?ifu=4039378&cni=U50494g

    let url = this.api.getUrl('AttestationExoTvaCompl', 'attestations/rest');
    url += '?ifu='+ this.user._user.identifiantFiscal+"&cni="+this.cni+"&nom="+this.nom+"&prenom="
    +this.prenom+"&adresse="+this.adresse+"&ville="+this.ville ;
    console.log(url);

    let URLENCODE = encodeURI(url);
    let decod = decodeURIComponent(url);
   
    this.fileTransfer= this.transfer.create();
    this.fileTransfer.download(URLENCODE, this.file.dataDirectory + 'AttestationExoTvaCompl.pdf').then((entry) => {
        // console.log('download complete: ' + entry.toURL());
        console.log('fileOpener: ' + entry.toURL());
        this.fileOpener.open(entry.toURL(), 'application/pdf')
        //this.fileOpener.open(entry.toURL(), 'application/pdf')
        //.then(() => console.log('File is opened'))
        //.catch(e => console.log('Error opening file', e));
        loadingIndicator.dismiss();
    }, (error) => {
      // handle error
      console.log("into : "+error);
      loadingIndicator.dismiss();
      console.log("into 2 : "+error.body);
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
