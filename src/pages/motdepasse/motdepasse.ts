import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Api, ApiNative } from '../../providers';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-motdepasse',
  templateUrl: 'motdepasse.html',
})
export class MotdepassePage {
  data: any = {};
  step:any;
	error_String: string;
	error_3_MSG_String: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public api: Api,public translateService: TranslateService) {
 
       

        this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
          this.error_String = value;
		 });
		 
		 this.translateService.get('ERREUR_3_MSG').subscribe((value) => {
			this.error_3_MSG_String = value;
		  });
		  
    this.data.login = '';
    this.data.email = '';
    this.step = 'START';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotdepassePage');
  }

  confirmer(){
		if(!this.data.login || !this.data.email){
			const toast = this.toastCtrl.create({
		      message: this.error_String,
		      duration: 3000
		    });
		    toast.present();
		    return;
		}
		// add code here here

		const headers = new Headers();
	    let body = { login : this.data.login,
	                 email : this.data.email};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/resetpassword', body, options, 'simpladhesion_aleg/rest')
	    		  	.map(resp => resp.json());

	    seq.subscribe((res: any) => {
	      console.log(res);
if ( res.status_code != 203 ){
	this.step='FINISHED';
} 
else {
	const toast = this.toastCtrl.create({
		message: this.error_3_MSG_String,
		duration: 3000
	  });
	  toast.present();
}
	    }, err => {
		 console.log("connect : "+err);
		  if (err == 'Error: 0' ) {
		  const toast = this.toastCtrl.create({
			message: this.error_3_MSG_String,
			duration: 3000
		  });
		  toast.present();
		}
	    }); 
  }
  
  abondonner(){
		this.navCtrl.push(LoginPage);
	}

}
