import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController,  NavParams, ToastController, MenuController, AlertController, LoadingController, PopoverOptions } from 'ionic-angular';
import { faInfoCircle, faCreditCard, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateService } from '@ngx-translate/core';
// import { EmailValidatorProvider } from '../../providers/email-validator/email-validator';
import { Validators, EmailValidator, FormGroup, FormControl  } from '@angular/forms';



declare var SMSReceive: any;

@IonicPage()
@Component({
  selector: 'page-achat-timbre',
  templateUrl: 'achat-timbre.html',
})

export class AchatTimbrePage {

  selectOptions: any = {cssClass: 'custom-selectbox', showBackdrop: false, enableBackdropDismiss: false};

  faInfoCircle = faInfoCircle;
  faCreditCard = faCreditCard;
  faListAlt = faListAlt;

  paiementMode : number = null;
  timbreType : string = '';
  qty : number = null;
 
  email : string ='';// 'be.saladin@gmail.com';
  emailConfirmation : string = '' ;//'be.saladin@gmail.com';
  tel : string = '';//'0707680303';
  telConfirmation: string ='';// '0707680303';
  orderData : any = null;
  fileTransfer: FileTransferObject;
  timbreLib: string;
  timbreLibAr: string;
  code: any='';
  alert: any ;
  error500_String: any;
  errorCode_String: any;
  MSSG_TIMBRE: string;
  MSSG_EMAIL: string;
  MSSG_TEL2: string;
  MSSG_TEL: string;
  MSSG_EMAIL2: string;
  MSSG_SAISMS: string;
  MSSG_ANNULER: string;
  MSSG_VALIDER: string;
  MSSG_1000: string;
  CODE_SMS: string;
  MSSG_EMAIL_INVALIDE: string;

  qtyValues: any = []
  

  filter : any = {from : '2022-06-01', to: '2022-06-30' , type : null};


  constructor(public translateService: TranslateService,private menu:MenuController,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams, private toastCtrl:ToastController, private alertCtrl:AlertController,
      public api: Api, public apiNative: ApiNative , public user: User,
      private transfer: FileTransfer, private file: File, private fileOpener: FileOpener/*,private screenshot: Screenshot*/) {
       // email: ['', Validators.compose([Validators.required, EmailValidatorProvider.isValid])];
    this.menu.swipeEnable(false);
    const registerForm = new FormGroup({
      first_name: new FormControl(), 
      last_name: new FormControl(), 
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl() 
    });

    this.translateService.get('MSSG_EMAIL_INVALID').subscribe((value) => {
      this.MSSG_EMAIL_INVALIDE = value;
       });

    this.translateService.get('errorCode_String').subscribe((value) => {
      this.errorCode_String = value;
    });
    this.translateService.get('MSSG_TIMBRE').subscribe((value) => {
      this.MSSG_TIMBRE = value;
    });
    this.translateService.get('MSSG_VALIDER').subscribe((value) => {
      this.MSSG_VALIDER = value;
    });
    this.translateService.get('MSSG_ANNULER').subscribe((value) => {
      this.MSSG_ANNULER = value;
    });
    this.translateService.get('MSSG_TEL').subscribe((value) => {
      this.MSSG_TEL = value;
    });
    this.translateService.get('MSSG_EMAIL').subscribe((value) => {
      this.MSSG_EMAIL = value;
    });
    this.translateService.get('MSSG_TEL2').subscribe((value) => {
      this.MSSG_TEL2 = value;
    });
    this.translateService.get('MSSG_EMAIL2').subscribe((value) => {
      this.MSSG_EMAIL2 = value;
    });
    this.translateService.get('MSSG_SAISMS').subscribe((value) => {
      this.MSSG_SAISMS = value;
    });
    this.translateService.get('MSSG_TEL2').subscribe((value) => {
      this.MSSG_TEL2 = value;
    });
    this.translateService.get('MSSG_1000').subscribe((value) => {
      this.MSSG_1000 = value;
    });
    this.translateService.get('CODE_SMS').subscribe((value) => {
      this.CODE_SMS = value;
    });

    for(var i = 1; i <= 10; i++){
      this.qtyValues.push(i);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchatTimbrePage');
 
    this.menu.swipeEnable(false);
    this.navCtrl.swipeBackEnabled = true;
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
      this.navCtrl.push(pageName,params);
    } else {
      this.navCtrl.setRoot(pageName,{},params1);
    }
  }

  screenShotsave(){

  }

  ionViewWillLeave() {
  // Don't forget to return the swipe to normal, otherwise 
  // the rest of the pages won't be able to swipe to open menu
  this.menu.swipeEnable(true);
  
  // If you have more than one side menu, use the id like below
  // this.menu.swipeEnable(true, 'menu1');
 }

  reload() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  submit(){

    if(this.paiementMode == 2 ){

      this.email = "dgi@gmail.com";
    this.emailConfirmation = "dgi@gmail.com";
      
      // return;
     }


    this.code ='';

    // this.email: ['', Validators.compose([Validators.required, EmailValidatorProvider.isValid])];
 
    if(!this.timbreType ){
      let toast = this.toastCtrl.create({
        message: this.MSSG_TIMBRE,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;

    }else {

      switch(this.timbreType) { 
        case "TP": { 
           //statements;
           this.timbreLib = "Timbre_Passeport";
           this.timbreLibAr = "جواز السفر";
           break; 
        } 
        case "TPC": { 
           //statements;
           this.timbreLib = "Timbre_Permis_de_chasse";
           this.timbreLibAr = "رخصة الصيد";
           break; 
        } 

        case "TPA": { 
          //statements;
          this.timbreLib = "Timbre_Port_d_arme";
          break; 
       } 
       case "TPIC": { 
        //statements;
        this.timbreLib = "Timbre_de_permis_international_de_conduire";
        this.timbreLibAr =  "رخصة القيادة الدولية";
        break; 
     } 
     
     } 
    }
  

    if(!this.tel ){
      let toast = this.toastCtrl.create({
        message: this.MSSG_TEL , 
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    if(this.tel != this.telConfirmation){
      let toast = this.toastCtrl.create({
        message: this.MSSG_TEL2 ,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }

    if(this.paiementMode == 1 && !this.email){
      let toast = this.toastCtrl.create({
        message: this.MSSG_EMAIL ,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;
    }

    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(!re.test(this.email.trim())){
			const toast = this.toastCtrl.create({
		      message: this.MSSG_EMAIL_INVALIDE ,//"L'email saisie n'est pas valide !",
		      duration: 3000
		    });
		    toast.present();
		    return;
    }
    
  

    if(this.paiementMode == 1 && this.email.trim() != this.emailConfirmation.trim()){
      let toast = this.toastCtrl.create({
        message: this.MSSG_EMAIL2 ,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      return;
    }

  
    // call webservice 

    // variables to use :
    /*
        paiementMode : number = 1;
        timbreType : string = "1";
        qty : number = 1;
        email : string = '';
        emailConfirmation : string = '';
        tel : string;
        telConfirmation: string;
    */

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //headers.append('token', this.user.token);
    //headers.append('username', this.user.username);
    headers.append('email', this.email);
    headers.append('numTel', this.tel);
    headers.append('nombreCommande', this.qty.toString());
    headers.append('typeTimbre', this.timbreType);
    // headers.append();
    let body = { /*email : this.email, 
                 numTel : this.tel,
                 //dateFrom : '20130101', 
                 nombreCommande : this.qty,
                 typeTimbre: this.timbreType*/ };


    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/timbre', body, options).map(resp => resp.json());
    //let headersApiNative = { 'Content-Type':  'application/x-www-form-urlencoded','token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/declarationsearch', body, headersApiNative).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      this.orderData = res.root;
      if(res.root.codeRetour == "000"){
 
        this.presentAlert();

      }
      if(res.root.codeRetour == "1000"){
 
        let toast = this.toastCtrl.create({
          message: this.MSSG_1000 ,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

      }
    }, err => {
      console.error('ERROR', err);});
  }

  async presentAlert(){

     this.alert =  this.alertCtrl.create({
      title: this.CODE_SMS,
      inputs: [
        {
          name: 'code',
          placeholder: this.MSSG_SAISMS ,
          value :  this.code
          
        }
      ],
      enableBackdropDismiss : false,
      buttons: [
        {
          text: this.MSSG_ANNULER,
          role: 'cancel',
          handler: data => {
           
          }
        },
        {
          text: this.MSSG_VALIDER,
          handler: data => {
            if(data.code != this.orderData.refpaiement){
              let toast = this.toastCtrl.create({
                message: this.errorCode_String
               , duration: 5000,
                position: 'bottom'
              });
              toast.present();
              return false;
            }

            if(this.paiementMode == 1){
              this.redirectToPaiementService(this.orderData);
            }else{
              var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
showBackdrop:true,
enableBackdropDismiss :true});
loadingIndicator.onDidDismiss(data => {
    
    console.log("DISMISSED LOADING");
});
              this.showReferenceReceipt(this.orderData);

              loadingIndicator.dismiss();

            } 
          }
        }
      ]
    });
    this.alert.present();
  
  }

  // https://csp-front.maroccommerce.com/tms-ts/bin/order-form.cgi?Hee653d8de211335a72fde825e80dc8ae:key_store_seqid=401990&op=view&scartid=6dde111a241411ea8a0a8f0da0677bc2&locale=fr-FR&kid=310001.100296&ss=env

  showReferenceReceiptOLD(orderData){
    let alert =  this.alertCtrl.create({
      title: 'Commande effectuée avec succès !',
      subTitle: 'Votre n° de référence de paiement est : ' + orderData.refpaiement + ".  Veuillez garder ce numéro pour l'utiliser lors du paiement de votre commande!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showReferenceReceipt(orderData){ 
    
  let urlPdf = this.api.getUrlTimbre();
  urlPdf+= '?reference='+ orderData.refpaiement+'&montant='+orderData.montantTotalPrix+'&tel='+this.tel+'&timbreLib='+this.timbreLib+'&timbreLibAR=';
  this.fileTransfer= this.transfer.create();
  this.fileTransfer.download(urlPdf, this.file.dataDirectory + 'recuTimbre.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log('fileOpener: ' + entry.toURL());
      this.fileOpener.open(entry.toURL(), 'application/pdf');
      this.email = "";
      this.emailConfirmation = "";
      //this.fileOpener.open(entry.toURL(), 'application/pdf')
      //.then(() => console.log('File is opened'))
      //.catch(e => console.log('Error opening file', e));
      
  }, (error) => {
    // handle error
    console.log(error);
  });
  

}



redirectToPaiementService(orderData){
  const headers = new Headers();
  let body = {};
  headers.append('Content-Type', 'application/json');
  headers.append('refPaiement',this.orderData.refpaiement);// );
  headers.append('email', this.email);
  headers.append('montant', this.orderData.montantTotalPrix);
  headers.append('modePaiement', '2');

  const options = new RequestOptions({headers: headers, params : {}});
  //console.log(seq);
  // console.log("orderData.refpaiement"+orderData.refpaiement+"orderData.montantTotalPrix"+orderData.montantTotalPrix);
  let seq = this.api.getAchatTimbre('providers/payerTimbre', body, options).map(resp => resp.json());
 
  seq.subscribe((res: any) => {
    console.log(res);
    var url = res;
    // status code message
    window.open(url.trim(),'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
  }, err => {
    console.error('ERROR', err);
    console.log(err);
    let toast = this.toastCtrl.create({
        message: 'Vos données sont incorrectes. Merci de réessayer.'
       , duration: 3500,
        position: 'bottom'
      });
      toast.present();
  });
}

reset(){
  if(this.paiementMode == 1 ) { 
 console.log("rest email");
  this.email=' ';
  this.emailConfirmation=' ';
  }
}

  
}