import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers';
import { User } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ReclamationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamation',
  templateUrl: 'reclamation.html',
})
export class ReclamationPage {

  dateTo : string = this.api.datePipeTo(new Date().toISOString());

  dateFrom : string = this.api.datePipeFrom(new Date().toISOString());

  filter : any = {from : '2015-01-01', to: this.dateTo, type : null};
  data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    public api: Api, public user: User, public translateService: TranslateService) {

      this.filter.from = this.api.getDateFrom5years(); 
      this.loadData();
  }

  loadData(){
    const headers = new Headers();
    headers.append('token',this.user.token);
    headers.append('username', this.user.username);

    let body = { idFiscal : '1000003'/*this.user._user.identifiantFiscal*/, //

    dateTo : this.api.datePipeWs(this.filter.to),
 
    dateFrom : this.api.datePipeWs(this.filter.from)};

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/mesReclamations', body, options).map(resp => resp.json());

    seq.subscribe((res: any) => {
      this.data = res.data;
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamationsPage');
  }

  backToPrevious(){
    this.navCtrl.pop();
  }

  logout(){
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

}
