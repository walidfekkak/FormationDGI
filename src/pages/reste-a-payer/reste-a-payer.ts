import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Api } from '../../providers';
import { User } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { CalendarPopoverPage } from '../calendar-popover/calendar-popover';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reste-a-payer',
  templateUrl: 'reste-a-payer.html',
})
export class ResteAPayerPage {

  dateTo : string = this.api.datePipeTo(new Date().toISOString());

  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());

  
  filter : any = {from : '2015-01-01', to: this.dateTo , type : null};
  
  data : any = null;

  dataKeys: any;

  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    public api: Api, public user: User, public translateService: TranslateService, public modalCtrl: ModalController ) {
      this.filter.from = this.api.getDateFrom5years(); 
    this.loadData();
  }

  loadData(){
    const headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('token', this.user.token);
    headers.append('username', this.user.username);

    // let body = { idFiscal : this.user._user.identifiantFiscal
    //    };

       let body = { idFiscal : '2221569' ,
       dateFrom : '20100101',
       dateTo : '20220101'//this.user._user.identifiantFiscal
          };


    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/recette', body, options).map(resp => resp.json());

     seq.subscribe((res: any) => {
      

       this.data = res.root.rarArticle;

       console.log(this .data);

      this.data.forEach(function(e){
        e.expanded = false;
        //e.year = e.dateDebutPeriode.substring(e.dateDebutPeriode.length - 4, e.dateDebutPeriode.length )
        //e.year = e.dateDebutPeriode.year
        //console.log('year : ' + e.year)
      })

      const groupByYear = this.groupBy('annee');

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

