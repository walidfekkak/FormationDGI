import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginPage } from '../login/login'
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Md5 } from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: 'page-adhesion-cpu',
  templateUrl: 'adhesion-cpu.html',
})
export class AdhesionCpuPage {

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
	ChangePass:Boolean = false;
	fileTransfer: FileTransferObject;

	constructor(public loadingController : LoadingController,private transfer: FileTransfer, private file: File,private fileOpener: FileOpener,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public api: Api, public alertCtrl : AlertController,
    			public translateService: TranslateService, private MD5: Md5) {

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

	// 	this.data.identifiantFiscal = '77433550';
    // this.data.cin='G82126';
	this.data.identifiantFiscal = '';
    this.data.cin='';
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
		this.data.password ='';
		this.data.passwordConfirm='';
		this.data.prenom = '';
		this.data.numTP = '';
		this.data.montantTP = '';
		this.data.isChecked =false;
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

	resetPassword(){
		console.log("browser langue : "+this.translateService.store.currentLang);

		this.data.isChecked = true;

		if(!this.data.identifiantFiscal || !this.data.cin){
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
	                 cni : this.data.cin,
                  isChangementPassword : this.data.isChecked};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/checkCpu', body, options, 'simpladhesion_aleg/rest')
	    		  	.map(resp => resp.json());

	    seq.subscribe((res: any) => {
			
			if( res.status_code == '400')
			
			{  this.step = 'LOGIN_TP';
			return;
			}

			this.data.raisonSociale = (res.root.raisonSociale != null)?res.root.raisonSociale:res.root.prenomPhys + ' ' + res.root.nomPhys;
			this.data.carteSejour = (res.root.carteSejour != null)?this.data.carteSejour:res.root.carteSejour;
			
			this.data.cniPrefix = res.root.cniPrefixAdh;
			this.data.cni = res.root.cniPrefixAdh+"-"+res.root.cniAdh;
			this.data.nomPhys = res.root.nomPhys;
			this.data.prenomPhys = res.root.prenomPhys;
			this.data.nom = res.root.nom;
			this.data.prenom = res.root.prenom;
			this.data.telephone = res.root.telephone;
			this.data.telephoneMobile = res.root.telephoneMobile;
			this.data.email = res.root.email;
			this.data.emailConf = res.root.emailConf;
		
			this.step = 'INFOS_EDIT';
	    }, err => {
		
		  if (err == 'Error: 0' ) {
		  const toast = this.toastCtrl.create({
			message: this.MSSG_ADHERENT,
			duration: 3000
		  });
		  toast.present();
		}
	    }); 
	}

	seConnecter(){
		console.log("browser langue : "+this.translateService.store.currentLang);

		if(!this.data.identifiantFiscal || !this.data.cin){
			const toast = this.toastCtrl.create({
		      message:  this.error_String,
		      duration: 3000
		    });
		    toast.present();
		    return;
		}
		// add code here here

		this.data.isChecked = false;
		const headers = new Headers();
	    let body = { idFiscal : this.data.identifiantFiscal,
	                 cni : this.data.cin,
                  isChangementPassword : this.data.isChecked};

	    const options = new RequestOptions({headers: headers, params : body});

	    let seq = this.api.get('providers/checkCpu', body, options, 'simpladhesion_aleg/rest')
	    		  	.map(resp => resp.json());

	    seq.subscribe((res: any) => {
			

			if( res.status_code == '400')
			
			{  this.step = 'LOGIN_TP';
			return;
			}

			if( res.status_code == '412')
	      {  this.step = false;
			const toast = this.toastCtrl.create({
				message: res.message,
				duration: 5000
			  });
			  toast.present();

			  this.step = 'CONNECT';
 
			 
			  return;
		  }
			this.data.raisonSociale = (res.root.raisonSociale != null)?res.root.raisonSociale:res.root.prenomPhys + ' ' + res.root.nomPhys;
			this.data.carteSejour = res.root.carteSejour;
			
			this.data.cniPrefix = res.root.cniPrefixAdh;
			this.data.cni = res.root.cniPrefixAdh+"-"+res.root.cniAdh;
			this.data.nomPhys = res.root.nomPhys;
			this.data.prenomPhys = res.root.prenomPhys;
			this.data.nom = res.root.nom;
			this.data.prenom = res.root.prenom;
			this.data.telephone = res.root.telephoneFix;
			this.data.telephoneMobile = res.root.telephoneMobile;
			this.data.email = res.root.email;
			this.data.emailConf = res.root.emailConf;
		
			this.step = 'INFOS_EDIT';
	    }, err => {
		
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

		// if(!this.data.identifiantFiscal || !this.data.email  
		// 	|| !this.data.nom ){
		// 	const toast = this.toastCtrl.create({
		//       message: 'this.error_String',// 'Veuillez saisir toutes les informations obligatoires',
		//       duration: 3000
		//     });
		//     toast.present();
		//     return;
		// }

		

		if(this.data.email != this.data.emailConf){
			const toast = this.toastCtrl.create({
		      message:'Les emails saisies ne sont pas conformes !',
		      duration: 3000
		    });
		    toast.present();
		    return;
		}

		if(this.data.password != this.data.passwordConfirm){
			const toast = this.toastCtrl.create({
		      message:'Les mots de passes saisies ne sont pas conformes !',
		      duration: 3000
		    });
		    toast.present();
		    return;
		}
		// var passRex = /^(?=.[A-Z])(?=.*[!@#$&*+])(?=.*[0-9])(?=.*[a-z]).{6}$/;
		var passRex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;
		// var passRex =  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/;

		if(!passRex.test(this.data.password)){
			const toast = this.toastCtrl.create({
		      message: "le mot de passe doit contenir au moins 6 caractères incluant un chiffre un caractère spécial et une lettre d'alphabet majuscule" ,//"L'email saisie n'est pas valide !",
		      duration: 3000
		    });
		    toast.present();
		    return;}

		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(!re.test(this.data.email)){
			const toast = this.toastCtrl.create({
		      message: this.MSSG_EMAIL_INVALIDE ,//"L'email saisie n'est pas valide !",
		      duration: 3000
		    });
		    toast.present();
		    return;
		}

		//@TODO verify phone number 

		const md5Password = Md5.hashStr(this.data.password);

		let body = new URLSearchParams();
	    body.set('idFiscal', this.data.identifiantFiscal);
	    body.set('email', this.data.email);
	    body.set('password', this.data.password);
			body.set('telephone', this.data.telephoneMobile);
			body.set('telephoneFix', this.data.telephone);
	    
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	    headers.append('password', this.data.password)
	    const options = new RequestOptions({headers: headers});

	    let seq = this.api.post('providers/AdhesionCpu', body.toString(), options, 'simpladhesion_aleg/rest').map(resp => resp.json());
					
			
	    seq.subscribe((res: any) => {
			

			var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
			showBackdrop:true,
			enableBackdropDismiss :true
		  });
		  loadingIndicator.onDidDismiss(data => {
			  
		  });
  
		  loadingIndicator.present();

		  
			let url = this.api.getPDFCpu('providers/TelechargerPdf', 'simpladhesion_aleg/rest');
			 url += '?idfiscal=' + this.data.identifiantFiscal+'&password=' + this.data.password;
			this.fileTransfer = this.transfer.create();

			// var md5Password = Md5.hashStr(this.data.password);
			// console.log('md5Password')
			// console.log(md5Password)

			// let headers = { password: md5Password};
	
			this.fileTransfer.download(url, this.file.dataDirectory + 'adhesioncpu.pdf'  ).then((entry) => {
			  console.log('download complete: ' + entry.toURL());
			  this.fileOpener.open(entry.toURL(), 'application/pdf')
			  
			  .then(() => console.log('File is opened'))
			  .catch(e => console.log('Error opening file', e));
			  loadingIndicator.dismiss();
		  }, (error) => {
			// handle error
		  });
	      
		  // go to next step
			//   this.step = 'MODES_PAIEMENT';
	    }, err => {
			console.log(err);
	   
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
		var md5Password = new Md5();
		console.log('md5Password ' + md5Password)
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
