import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Api } from '../../providers';
import { User } from '../../providers';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  item : any;
  itemType : String = 'declaration';
  toastCtrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public user: User, public translateService: TranslateService) {
    this.item = this.navParams.get('item');
    this.itemType = this.navParams.get('itemType');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
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

}
