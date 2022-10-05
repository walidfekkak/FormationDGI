
import { NgModule,Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Api, ApiNative } from '../../providers';
import {  Request,  RequestOptionsArgs, Response, ResponseOptions, ResponseType , XHRBackend } from "@angular/http"
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the PaiementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paiement-private',
  templateUrl: 'paiement-private.html',
})



// @NgModule({
// 	declarations: [],
// 	imports: [
// 		RecaptchaModule.forRoot()
// 	],
// 	exports: []
// })



export class PaiementPrivatePage {

  reference: { ref: string, email: string ,montant : string} = {
    ref: '' ,//'9010003011195',
    email: '',//'walidfekkak@gmail.com'
    montant:''
  };

  hideMe=false;
  pcb=true;
  ppb=false;
 
  public teleservices:any = [];
  // reference: { number: string , email: string } = {
  //   number: '',email:''
    
  // };

  // reference : any = {number : '', email: ''};
  data: any;

  private captchaPassed: boolean = false;
  private captchaResponse: string;



  constructor(private zone: NgZone,public toastCtrl: ToastController/*,private iab: InAppBrowser*/,private menu:MenuController,public navCtrl: NavController, public navParams: NavParams,public api:Api, private apiNative : ApiNative) {
  
this.menu.swipeEnable(false);
this.teleservices.push({'Simpl-IS':'https://simpl-is.tax.gov.ma/is/simplis/'});
this.teleservices.push({'Simpl-TVA':'https://simpl-tva.tax.gov.ma/tva/eserviceTVAS/'});
this.teleservices.push({'Simpl-IR':'https://simpl-ir.tax.gov.ma/ir/simplir/'});
this.teleservices.push({'Simpl-IR Particuliers':'https://simpl-ir-part.tax.gov.ma/simplir_Part/'});
   }

   backToPrevious(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeleservicesPage');
  }

  redirect(pageName:string ='none', params = null ){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
      this.navCtrl.setRoot(pageName,{}, params);

    }
  }

  redirectWeb(pageName:string ='none',params =null){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
       console.log(" URL , PAY : "+params.lien)
       //this.iab.create(params.lien, '_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
      // window.open(params.lien, '_System' ,'location=no');
      window.open(params.lien,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

    }
  }

  keys(obj){
    return Object.keys(obj);
}

  hideppb() {
    this.ppb = !this.ppb;
    this.pcb = false;
    this.captchaPassed = false;
    console.log("hide/show ppb "+this.ppb);
  }

   hidepcb() {
    this.pcb = !this.pcb;
    this.ppb = false;
    this.captchaPassed = false;
    console.log("hide/show pcb "+this.pcb);
  }


  getLink(){


    const headers = new Headers();
    let body = {};
    //headers.append('Content-Type', 'application/json');
    headers.append('refPaiement',this.reference.ref);// );
    headers.append('email', this.reference.email);
    headers.append('montant', this.reference.montant);
    headers.append('modePaiement', '2');

    const options = new RequestOptions({headers: headers, params : {}});

   
    //headers.append('Access-Control-Allow-Origin','*');
    //const options = new RequestOptions({headers: headers, params : body});
    const httpHeader = {'montant':this.reference.montant,'refPaiement':this.reference.ref,'email': this.reference.email,'modePaiement': '2'};
    //let seq = this.apiNative.get('providers/payerTimbre', body, httpHeader ).map(resp => JSON.parse(resp.data));
    console.log('DATA PAIEMENT Before');
    //console.log(seq);
    let seq = this.api.getAchatTimbre('providers/payerTimbre', body, options).map(resp => resp.json());
    
    // let seq = this.apiNative.get('providers/payerTimbre', body, {}).map(resp => JSON.parse(resp.data));
    // let seq = this.api.get('providers/payerTimbre', body, options).map(resp => resp.json());
   
    seq.subscribe((res: any) => {
     
   
    console.log(res);

    //  this.data = res.data.URL;
     

    // this.data = res;

    this.data = res.URL;


    //let iab_p = this.iab.create(this.data.trim(),'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

    //iab_p.executeScript()

    this.ppb = false;
    this.pcb = this.ppb;

    window.open(this.data.trim(),'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');


    //window.open('https://golden.maroccommerce.com/tms-ts/bin/order-form.cgi?Hb8212c99efb3b261cfc0e96c40f87c58:key_store_seqid=400423&op=addMulti&scartid=fab139949d3411e99afe9239df2746f3&locale=fr-FR&kid=310001.100262&ss=env','_self','location=yes');

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

 

  captchaResolved(response: string): void {

      this.zone.run(() => {
          this.captchaPassed = true;
          this.captchaResponse = response;
      });

  }

  sendForm(): void {

      let data = {
          captchaResponse: this.captchaResponse
      };      

      this.api.post('https://www.google.com/recaptcha/api/siteverify', data).subscribe(res => {
          console.log(res);
      });

  }


  

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

}
