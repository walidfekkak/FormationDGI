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
  selector: 'page-attestation7',
  templateUrl: 'attestation7.html',
})

export class Attestation7Page {

  email : string = '';
  
  numTP : string = '';
  titre_foncier_mere: string = '';
  if_prometeur : string = '';
  nlfu: string = ''

  nums_titres_fonciers : Array<string> = [];
  nums_titres_fonciers_details : Array<any> = [];

  public data_checked_but_not_valid: boolean  = false

  fileTransfer: FileTransferObject = null;
  error_String: any;
  MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND: string;
  MSSG_INFO_IF_NOTAIRE_NOT_FOUND: string;
  MSSG_INFO_IF_PROMOTEUR_NOT_FOUND: string;

  constructor(public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
  
    
    public api: Api, public apiNative: ApiNative , public user: User,
  
    private transfer: FileTransfer, private file: File,
  
    private fileOpener: FileOpener, private toastCtrl:ToastController,public translateService: TranslateService) {
  

      // this.nums_titres_fonciers.push("67157/38")

      this.translateService.get('MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND').subscribe((value) => {
        this.MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND = value;
      });
      this.translateService.get('MSSG_INFO_IF_NOTAIRE_NOT_FOUND').subscribe((value) => {
        this.MSSG_INFO_IF_NOTAIRE_NOT_FOUND = value;
      });
      this.translateService.get('MSSG_INFO_IF_PROMOTEUR_NOT_FOUND').subscribe((value) => {
        this.MSSG_INFO_IF_PROMOTEUR_NOT_FOUND = value;
      });
      this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
        this.error_String = value;
      });
      //console.log("this.user._user")
      //console.log(this.user._user)
      this.nlfu = this.user._user.identifiantFiscal;
      //this.nlfu = "1442313"
    }

  ionViewDidLoad() {}

  add_num_titre_foncier(){
    this.nums_titres_fonciers.push("")
  }

  trackEditList(index,item){
    return index;
  }

  prefill_titre_foncier_with_details(){
    var self = this;
    this.nums_titres_fonciers.forEach(function(e){
      self.nums_titres_fonciers_details.push({titre: e, adresse: "", commune: "", ville:"", vente:null, natureBien: "", precision:"", autre:null})
    })
    if(this.nums_titres_fonciers_details.length <= 0)
      this.nums_titres_fonciers_details.push({titre: "", adresse: "", commune: "", ville:"", vente:null, natureBien: "", precision:"", autre:null})
  }

  runWS_1(){
    var self = this;
    if(!this.if_prometeur || !this.nlfu ){
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
    headers.append('Content-Type', 'application/json');
    /*let body = { 
      idFiscal: this.user._user.identifiantFiscal,
      numTP: this.numTP
    };*/
    let body = JSON.stringify({list : this.nums_titres_fonciers})
    const options = new RequestOptions({headers: headers});

    let seq = this.api.postAttestation('AttestationExoP?nIfu='+this.nlfu+'&pIfu='+this.if_prometeur+ '&numTfMere=' + this.titre_foncier_mere, body, options, 'attestations/rest');
    //.map(resp => resp.json());
    // url_check += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;

    let pdfID = "";
    seq.subscribe((res: any) => {
      console.log('AttestationExoP res');
      console.log(res);
      if(res.status == 202){
        pdfID = res._body;  

        var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
          showBackdrop:true,
          enableBackdropDismiss :true
        });
        loadingIndicator.onDidDismiss(data => {  
            console.log("DISMISSED LOADING");
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
      if(res.status == 401){
        this.data_checked_but_not_valid = true
        this.nums_titres_fonciers.forEach(function(e){
          this.nums_titres_fonciers_details.push({titre: e, adresse: "", commune: "", ville:"", vente:null, natureBien: "", precision:"", autre:null})
        })
        let toast = this.toastCtrl.create({
          message: this.MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
        //return;
      }
     
  //}
    }, err => {  
      console.log(err);
      console.log(err.message)
      let splittedErrorMsg = err.message.split('||');
      let err_status = splittedErrorMsg[0]
      let err_msg = splittedErrorMsg[1]
      console.log(err_msg)

      if(err_status == 401 && err_msg.indexOf('CID-M066003') != -1){
        console.log('inside')
        let toast = this.toastCtrl.create({
          message: this.MSSG_INFO_IF_NOTAIRE_NOT_FOUND,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
      }
      if(err_status == 401 && err_msg.indexOf('CID-AT0001') != -1){
        console.log('inside')
        let toast = this.toastCtrl.create({
          message: this.MSSG_INFO_IF_PROMOTEUR_NOT_FOUND,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
      }
      if(err_status == 401 && err_msg.indexOf('CID-AT0003')  != -1){
        this.prefill_titre_foncier_with_details()
        this.data_checked_but_not_valid = true
        let toast = this.toastCtrl.create({
          message: this.MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
      }
    });
  }

  runWS_2(){

    if(!this.if_prometeur || !this.titre_foncier_mere ){
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
  
    /*let body = { 
      idFiscal: this.user._user.identifiantFiscal,
      numTP: this.numTP
    };*/

    let body = {listTitres : this.nums_titres_fonciers_details}
    //let params = {}

    const options = new RequestOptions({headers: headers,/* params: params,*/ body : body});

    let pdfID = "";

    let seq = this.api.postAttestation('AttestationExoPCompl?nIfu='+this.nlfu+'&pIfu='+this.if_prometeur + '&numTfMere=' + this.titre_foncier_mere, body, options, 'attestations/rest')
    // url_check += '?idFiscal=' + this.user._user.identifiantFiscal + '&numTP=' + this.numTP;

    seq.subscribe((res: any) => {
      console.log(res);
      //console.log(res.status_code);

      if(res.status == 202){
        pdfID = res._body;  

        var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
          showBackdrop:true,
          enableBackdropDismiss :true
        });
        loadingIndicator.onDidDismiss(data => {
            
        });

        loadingIndicator.present();

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

      if(res.status == 401){ 
        let toast = this.toastCtrl.create({
          message: this.MSSG_INFO_ATTESTATION_TH_TSC_NOT_FOUND,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();  
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



