import { Component } from '@angular/core';
import { DateTime, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

import { CalendarPopoverPage } from '../calendar-popover/calendar-popover';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-declarations-list',
  templateUrl: 'declarations-list.html',
})
export class DeclarationsListPage {

  /*selectOptions: any = {cssClass: 'custom-selectbox', showBackdrop: false, enableBackdropDismiss: false};*/

  dateTo : string = this.api.datePipeTo(new Date().toISOString());

  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());

  
  filter : any = {from : '2015-01-01', to: this.dateTo , type : null};
  data : any = null;
  displayFooter: boolean = true;
  MSSG_5YEARS: string;

  dataKeys: any;

  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, 
    public api: Api, public apiNative: ApiNative , public user: User, public translateService: TranslateService,
      public modalCtrl: ModalController ) { 

    this.translateService.get('MSSG_5YEARS').subscribe((value) => {
      this.MSSG_5YEARS = value;
    })

    console.log("Today :"+Date.now());
    

    this.filter.from = this.api.getDateFrom5years(); 

    


    this.loadData();
  }

  testDate() {

    console.log(this.api.checkDiffDate(this.filter.to , this.filter.from) +" dAte")
    if(!this.api.checkDiffDate(this.filter.to , this.filter.from) ){

      let toast = this.toastCtrl.create({
        message: this.MSSG_5YEARS,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
      return;

    }

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

    // headers.append();
    let body = { idFiscal : this.user._user.identifiantFiscal, 
                 //dateTo : '20170622',
                 dateTo : this.api.datePipeWs(this.filter.to),
                 //dateFrom : '20130101', 
                 dateFrom : this.api.datePipeWs(this.filter.from),
                 typeImpot: this.filter.type || '' 
                };


    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/declarationsearch', body, options).map(resp => resp.json());
    //let headersApiNative = { 'Content-Type':  'application/x-www-form-urlencoded','token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/declarationsearch', body, headersApiNative).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      this.data = res.data;

      if(!this.data) this.data = [];
      
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: 'dadada', dateDebutPeriode: {year: 2020} ,numeroDepot: '6446894', _dateHeureAccuseReception: '01-12-2018', dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: 'ddada', dateDebutPeriode: {year: 2020}, dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
      

      this.data.forEach(function(e){
        e.expanded = false;
        //e.year = e._dateDebutPeriode.substring(e._dateDebutPeriode.length - 4, e._dateDebutPeriode.length )
        e.year = e.dateDebutPeriode.year
        //console.log('year : ' + e.year)
      })

      const groupByYear = this.groupBy('year');

      this.data = groupByYear(this.data);
      this.dataKeys = Object.keys(this.data);
      this.dataKeys = this.dataKeys.reverse();

    }, err => {
      console.error('ERROR', err);});
  }

  showDetails(item){
    item.expanded = !item.expanded
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclarationsListPage');
  }

  backToPrevious(){
    this.navCtrl.pop();
   // this.displayFooter = false;
  }
  

  logout(){
    //this.navCtrl.pop();
    this.navCtrl.push('LoginPage');
  }

  redirect(pageName:string ='none', params = null, params1 = null  ){
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
