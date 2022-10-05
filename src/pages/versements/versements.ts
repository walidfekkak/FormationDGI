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
  selector: 'page-versements',
  templateUrl: 'versements.html',
})
export class VersementsPage {
  dateTo : string = this.api.datePipeTo(new Date().toISOString());
  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());
  filter : any = {from : '2015-01-01', to: this.dateTo , type : null};
  
  data : any;
  MSSG_5YEARS: string;

  dataKeys: any;
  
  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    public api: Api, private apiNative : ApiNative, public user: User, public translateService: TranslateService,
      public modalCtrl: ModalController) {
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
    
    let body = { idFiscal : this.user._user.identifiantFiscal, 
                //  dateTo : '20220101',
                 dateTo : this.api.datePipeWs(this.filter.to),
                //  dateFrom : '20160905', 
                 dateFrom : this.api.datePipeWs(this.filter.from),
                 typeImpot: this.filter.type || '',
                 operation: 'versement' };

                 console.log(" date to : "+this.api.datePipeWs(this.filter.to));

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/recette', body, options).map(resp => resp.json());
    // let headersApiNative = { 'token' : this.user.token, 'username' : this.user.username};
    // let seq = this.apiNative.get('providers/recette', body, options).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      this.data = res.root.operationsRecette;

      console.log(this.data);

      if(this.data == null) {  console.log("no data"); return}
      if(!this.data) this.data = []

      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: 'dadada', dateDebutPeriode: {year: 2020} ,numeroDepot: '6446894', _dateHeureAccuseReception: '01-12-2018', dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: 'ddada', dateDebutPeriode: {year: 2020}, dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
      //this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
    
      this.data.forEach(function(e){
        e.expanded = false;
        e.year = e.dateDebutImposition.year;
        //e.year = "2020"
        console.log('year : ' + e.year)
      })

      const groupByYear = this.groupBy('annee');

      this.data = groupByYear(this.data);
      this.dataKeys = Object.keys(this.data);
      this.dataKeys = this.dataKeys.reverse();

      console.log(this.data);

    }, err => {
      console.error('ERROR', err);
    });
  }

  showDetails(item){
    item.expanded = !item.expanded
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersementsPage');
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

