import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { Api, ApiNative } from '../../providers';
import { Headers ,RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-identification-data',
  templateUrl: 'identification-data.html',
})
export class IdentificationDataPage {
  data: any;

  constructor(public user :User ,public api :Api ,public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private apiNative :ApiNative, 
    public translateService: TranslateService) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentificationDataPage');
  }

  backToPrevious(){
    this.navCtrl.pop();
  }

  loadData(){
    const headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('token', this.user.token);
    headers.append('username', this.user.username);
    // this.user._user.identifiantFiscal = 2221569 ;
    // headers.append();
    let body = { idFiscal : this.user._user.identifiantFiscal };
    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/dashboard', body,options).map(resp => resp.json());
    //let headersApiNative = {  'Content-Type':  'application/x-www-form-urlencoded', 'token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/dashboard', body, headersApiNative).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      console.log('contribuable')
      console.log(res)
      this.data = res.root.contribuable;
    }, err => {
      console.error('ERROR', err);
    });
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

}