import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { CalendarPopoverPage } from '../calendar-popover/calendar-popover';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-remboursements',
  templateUrl: 'remboursements.html',
})
export class RemboursementsPage {
  dateTo : string = this.api.datePipeTo(new Date().toISOString());

  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());

  
  filter : any = {from : '2015-01-01', to: this.dateTo , type : null};

  MSSG_5YEARS: string;

  data : any = null;

  dataKeys: any;

  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


  constructor(public translateService:TranslateService , public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, 
    public api: Api, private apiNative : ApiNative, public user: User, public modalCtrl: ModalController ) {
      this.translateService.get('MSSG_5YEARS').subscribe((value) => {
        this.MSSG_5YEARS = value;
      })

      this.filter.from = this.api.getDateFrom5years(); 
  
    this.loadData();
  }

  loadData(){
    const headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('token', this.user.token);
    headers.append('username', this.user.username);

    
     
    if(!this.api.checkDiffDate(this.filter.to , this.filter.from) ){

      let toast = this.toastCtrl.create({
        message: this.MSSG_5YEARS,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;

    }

    let body = { idFiscal : '1000003' /*this.user._user.identifiantFiscal*/, 
      dateTo : this.api.datePipeWs(this.filter.to),
      dateFrom : this.api.datePipeWs(this.filter.from),
      typeImpot: this.filter.type || '',
    wsId : 'demande' };


    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/declarationsearch', body, options).map(resp => resp.json());
    //let headersApiNative = { 'token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/declarationsearch', body, headersApiNative).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      console.log(res.data);
      this.data = res.data;

      this.data.forEach(function(e){
        e.expanded = false;
        // e.year = e.dateDebutPeriode.substring(e.dateDebutPeriode.length - 4, e.dateDebutPeriode.length )
        e.year = e.dateDebutPeriode.year
        console.log('year : ' + e.year)
      })

      const groupByYear = this.groupBy('year');

      this.data = groupByYear(this.data);
      this.dataKeys = Object.keys(this.data);
      this.dataKeys = this.dataKeys.reverse();

    }, err => {
      console.error('ERROR', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Remboursment');
  }

  showDetails(item){
    item.expanded = !item.expanded
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
        message: "La logique de click n'est pas encore pr??te ! L'??quipe de d??v travail dessus...",
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
