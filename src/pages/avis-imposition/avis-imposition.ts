import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { CalendarPopoverPage } from '../calendar-popover/calendar-popover';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avis-imposition',
  templateUrl: 'avis-imposition.html',
})
export class AvisImpositionPage {

  
   num: string = null ;
  dateTo : string = this.api.datePipeTo(new Date().toISOString());

  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());
  years : any = [];

  filter : any = {from : this.dateFrom, to: this.dateTo , type : null, year : new Date().getFullYear(), numTaxe : ''};

  //filter : any = {from : this.dateFrom, to: this.dateTo , type : null, year : new Date().getFullYear(), numTaxe : ''};
  data : any = null;

  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, 
    public api: Api, public user: User, private apiNative : ApiNative, public translateService: TranslateService,
    public modalCtrl: ModalController ) {
    
      
    let currentYear  = new Date().getFullYear();
    for(let y = currentYear; y >  currentYear - 10; y--){
      this.years.push(y);
    }
    this.loadData();
  }

  loadData(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // let body = {};

    let body = { anneeBudgetaire : this.filter.year.toString(), 
                 //dateTo : '20170622',
                 codeTypeImpot : this.filter.type || '0',
                 //dateFrom : '20130101', 
                 identifiantFiscal : '2221569' /*this.user._user.identifiantFiscal*/,
                 numTaxe: this.filter.numTaxe || '0',
                 numberPerPage: '12',
                 numPage: '1',
                 count: '12',
               };

    headers.append('anneeBudgetaire',this.filter.year.toString() ) ;
    headers.append('codeTypeImpot', this.filter.type || '0');
    headers.append('identifiantFiscal', this.user._user.identifiantFiscal);
    headers.append('numTaxe' , this.filter.numTaxe || '0');
    headers.append( 'numberPerPage', '12');
    headers.append( 'numPage' ,'1');
    headers.append('count' , '12');

   
          

    const options = new RequestOptions({headers: headers, params : body});

    console.log(options);

    let seq = this.api.get('providers/avisImpositions', body, options).map(resp => resp.json());

    seq.subscribe((res: any) => {
      console.log(res);
      this.data = res;
    }, err => {
      console.error('ERROR', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Remboursment');
  }

  backToPrevious(){
    this.navCtrl.pop();
  }

  logout(){
    //this.navCtrl.pop();
    this.navCtrl.push('LoginPage');
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

 showCalendarModal() {
    const modal = this.modalCtrl.create(CalendarPopoverPage, {from: this.filter.from, to: this.filter.to});
    modal.onDidDismiss(data => {
      if(!data) return;
      console.log(data);
      this.filter.from = data.from
      this.filter.to = data.to
    });
    modal.present();
  }
  
}
