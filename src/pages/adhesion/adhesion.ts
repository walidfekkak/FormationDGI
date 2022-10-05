import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-adhesion',
  templateUrl: 'adhesion.html',
})
export class AdhesionPage {

	@ViewChild('myinput') inpution;
    private focused: boolean = true;
	   data: any = {};
	   res:any;
	step : any = 'CONNECT';
	banqueList : any = [];

	rib: boolean = false;
	keyboard: any;
	error_String: any;
	MSSG_EMAIL_INVALIDE: string;
	MSSG_INFO: string;
	MSSG_INFO_TEXT: string;
	MSSG_RIB_ERROR: string;
	MSSG_ADHERENT: string;
	MSSG_RIB_EXIST: string;
	MSSG_RIB_IN: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public api: Api, public alertCtrl : AlertController,
    			public translateService: TranslateService) {

					this.translateService.get('reinitialisation-erreur1').subscribe((value) => {
						this.error_String = value;
					   });
					   this.translateService.get('MSSG_EMAIL_INVALID').subscribe((value) => {
						this.MSSG_EMAIL_INVALIDE = value;
					   });
					   this.translateService.get('MSSG_RIB_INVALIDE').subscribe((value) => {
						this.MSSG_RIB_ERROR = value;
					   });

					   this.translateService.get('MSSG_ADHERENT').subscribe((value) => {
						this.MSSG_ADHERENT = value;
					   });

					   this.translateService.get('MSSG_RIB_IN').subscribe((value) => {
						this.MSSG_RIB_IN = value;
					   });

					   this.translateService.get('MSSG_RIB_EXIST').subscribe((value) => {
						this.MSSG_RIB_EXIST = value;
					   });

					   


		this.data = {};
		//this.data.identifiantFiscal = '17403020';
		//this.data.codeAcces = '5AC23630';

		this.data.identifiantFiscal = '';
		this.data.codeAcces = '';
		this.data.codeVerification = '';
		this.data.raisonSociale = '';
		this.data.cinNumber = '';
		this.data.carteSejour = '';
		this.data.telephone = '';
		this.data.telephoneMobile = '';
		this.data.email = '';
		this.data.emailConf = '';
		this.data.raisonSocialeAr = '';
		this.data.nom = '';
		this.data.prenom = '';
		
		this.data.modeMulticanal = 1;
		this.data.modePrelevementBancaire = 0;
		//this.initData();
	}

	hideRib(){
		this.rib = !this.rib;
	}

	initBanqueList(){
		const headers = new Headers();
	    let body = { idFiscal : this.data.identifiantFiscal,
	                 codeSit : this.data.codeAcces};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/banquelist', body, options, 'simpladhesion_aleg/rest').map(resp => resp.json());

	    seq.subscribe((res: any) => {
	      console.log(res);
	      res.forEach(banque => {
	      	if(banque.deleted == 0)
	      		this.banqueList.push(banque);
	      });
	    }, err => {
	      console.error('ERROR', err);
	    });
	}

	initData(){
		// load banks
		const headers = new Headers();
	    let body = { idFiscal : this.data.identifiantFiscal,
	                 codeSit : this.data.codeAcces};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/banquelist', body, options, 'simpladhesion_aleg/rest').map(resp => resp.json());

	    seq.subscribe((res: any) => {
	      console.log(res);
	      res.forEach(banque => {
	      	if(banque.deleted == 0)
	      		this.banqueList.push(banque);
	      });
	    }, err => {
	      console.error('ERROR', err);
	    });

	}

	abondonner(){
		this.step = 'CONNECT';
	}

	seConnecter(){
		console.log("browser langue : "+this.translateService.store.currentLang);

		if(!this.data.identifiantFiscal || !this.data.codeAcces){
			const toast = this.toastCtrl.create({
		      message:  this.error_String,
		      duration: 3000
		    });
		    toast.present();
		    return;
		}
		// add code here here

		const headers = new Headers();
	    let body = { idFiscal : this.data.identifiantFiscal,
	                 codeSit : this.data.codeAcces};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/check', body, options, 'simpladhesion_aleg/rest')
	    		  	.map(resp => resp.json());

	    seq.subscribe((res: any) => {
	      console.log(res);

		  // raisonSociale null ' exception 

			this.data.raisonSociale = (res.root.raisonSociale != null)?res.root.raisonSociale:res.root.prenomPhys + ' ' + res.root.nomPhys;
			this.data.carteSejour = res.root.carteSejour;
			
			this.data.cniPrefix = res.root.cniPrefix;
			this.data.cni = res.root.cni;
			this.data.prenomPhys = res.root.prenomPhys;
			this.data.nom = res.root.nomPhys;
			this.data.prenom = res.root.prenomPhys;
			this.data.telephone = res.root.telephone;
			this.data.telephoneMobile = res.root.telephoneMobile;
			this.data.email = res.root.email;
			this.data.emailConf = res.root.emailConf;
			this.data.raisonSocialAr = res.root.raisonSocialAr;
			this.step = 'VERIFICATION';
	    }, err => {
		 console.log("connect : "+err);
		  if (err == 'Error: 0' ) {
		  const toast = this.toastCtrl.create({
			message: this.MSSG_ADHERENT,
			duration: 3000
		  });
		  toast.present();
		}
	    }); 
	}

	verification(){
		console.log("browser langue : "+this.translateService.getBrowserLang())

		this.step = 'INFOS_EDIT';
		this.initData();
	}

	edit_infos(){

		if(!this.data.identifiantFiscal || !this.data.email  
			|| !this.data.nom ){
			const toast = this.toastCtrl.create({
		      message: this.error_String,// 'Veuillez saisir toutes les informations obligatoires',
		      duration: 3000
		    });
		    toast.present();
		    return;
		}

		// if(!this.data.cinNumber && !this.data.carteSejour){
		// 	const toast = this.toastCtrl.create({
		//       message: 'Vous devez indiquer votre cin ou votre n° de carte de séjour',
		//       duration: 3000
		//     });
		//     toast.present();
		//     return;
		// }

		if(this.data.email != this.data.emailConf){
			const toast = this.toastCtrl.create({
		      message: this.error_String,//'Les emails saisies ne sont pas conformes !',
		      duration: 3000
		    });
		    toast.present();
		    return;
		}

		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(!re.test(this.data.email)){
			const toast = this.toastCtrl.create({
		      message: this.MSSG_EMAIL_INVALIDE ,//"L'email saisie n'est pas valide !",
		      duration: 3000
		    });
		    toast.present();
		    return;
		}

		// @TODO verify phone number 

		let body = new URLSearchParams();
	    body.set('idFiscal', this.data.identifiantFiscal);
	    body.set('email', this.data.email);
	    body.set('emailConf', this.data.emailConf);
	    body.set('telephone', this.data.telephone);
	    body.set('telephoneMobile', this.data.telephoneMobile);
		
		body.set('cniPrefix', this.data.cniPrefix);
		body.set('cni', this.data.cni);
		
	    body.set('carteSejour', this.data.carteSejour);
	    body.set('nom', this.data.nom);
	    body.set('prenom', this.data.prenom);
	   	body.set('raisonSociale', this.data.raisonSociale);
	    body.set('raisonSocialAr', this.data.raisonSocialAr);
	    
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	    const options = new RequestOptions({headers: headers});

	    let seq = this.api.post('providers/signup', body.toString(), options, 'simpladhesion_aleg/rest')
					.map(resp => resp.json());
					
					

	    seq.subscribe((res: any) => {
	      console.log(res);
	      //this.data = res.data;
	      
		  // go to next step
		  this.step = 'MODES_PAIEMENT';
	    }, err => {
	      const prompt = this.alertCtrl.create({
            title: '<p style="color:red">'+this.MSSG_INFO+'</p>',
            message:"<span>"+this.MSSG_INFO_TEXT+"</span>"
           });
           prompt.present();
	    });

	    //this.step = 'MODES_PAIEMENT';

	}

	validerModesPaiement(){



		if(!this.rib) {
			this.logout();//return false;
		}

		let body = new URLSearchParams();
	    body.set('idFiscal', this.data.identifiantFiscal);
	    body.set('RIB', this.data.rib);
	    body.set('banqueId', this.data.banqueId);

	    //body.set('emailConf', this.data.emailConf);
	    //body.set('telephone', this.data.telephone);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.post('providers/paiementmode', body.toString(), options, 'simpladhesion_aleg/rest')
	    .map(resp => resp.json());

	    seq.subscribe((res: any) => {
	      console.log(res.status_code);
	      //this.data = res.data;
			  // go to next step
if (res.status_code == 203 ) {
			  const toast = this.toastCtrl.create({
				message: this.MSSG_RIB_ERROR,
				duration: 3000
			  });
			  toast.present(); 
			return false;
			} 

			if (res.status_code == 200 ) {
				const toast = this.toastCtrl.create({
				  message:  this.MSSG_RIB_IN,
				  duration: 3000
				});
				toast.present(); 
			  
			  } 

			  this.logout();
			  
	    }, err => {

			

			if (err == 'Error: 0' ) {
                        
				const toast = this.toastCtrl.create({
					message: this.MSSG_RIB_EXIST ,
					duration: 3000
				  });
				  toast.present(); 

		
		}
	    
		  // this.logout();
	    });

	}
	

	ionViewDidLoad() {
		console.log('ionViewDidLoad AdhesionPage');

	// 	if (this.focused) {
	// 		setTimeout(() => { this.input.setFocus(); this.keyboard.show(); },2000); 
	// }
}

ngAfterViewChecked() {
//    this.inpution.setFocus();
  console.log('ngAfterViewChecked AdhesionPage');
  }

	logout(){
		//this.navCtrl.pop();
		this.navCtrl.push(LoginPage);
	  }


}
