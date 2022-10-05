import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, MenuController, Platform } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers';
import { Api } from '../../providers';
import { AchatTimbrePage } from '../achat-timbre/achat-timbre'


import { AdhesionPage } from '../adhesion/adhesion'
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MainPage } from '../';
import { MotdepassePage } from '../motdepasse/motdepasse';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AdhesionAllPage } from '../adhesion-all/adhesion-all'
import { LaunchReview } from '@ionic-native/launch-review/ngx';
//import { Market } from '@ionic-native/market/ngx';'../adhesion-all/adhesion-all';

import { LangChooserPopoverPage } from '../lang-chooser-popover/lang-chooser-popover';



import { CalendarPopoverPage } from '../calendar-popover/calendar-popover';
import { ModalController } from 'ionic-angular';

declare let window: any; 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  filter : any = {from : '2015-01-01', to: '2022-01-01', type : null};


  /*account: { username: string, password: string } = {
    username:  '',
    password: ''
  };*/

  account: { username: string, password: string } = {
    // username: '' ,
    // password: '' 
    //username: '' ,
    //password: '' 
    //username: 'test_1000003',
    //password: 'WZIW389f'
    username: 'testh_1101', // qualif
    password: 'simpltva11',
    //username: 'ssdt_48', // prod
    //password: '9SNO6c83'
  }

  footer = false;
  public onlineOffline: boolean = navigator.onLine;

  // Our translated text strings
  private loginErrorString: string;
  CnxErrorString: any;
  MSSG_CANCEL: string ;
  MSSG_OK: string;
  // public translateServiceClone: TranslateService;
  loginErrorArString: string;
  public updateTitleStr : string = '';
  public updateMessageStr : string = '';

  public rememberMe: boolean = false;

  public fingerPrintAvailable: boolean = false;
  public useFingerPrintAuth: boolean = false;
  public normalConnexionSucceded: boolean = false;
  public auth_username: string = '';
  public auth_password: string = '';

  public version:string ='7.1.0';
  data: any;
  //currentLng: any;
  public alert: any;

  constructor(public modalCtrl: ModalController ,public popoverCtrl: PopoverController, public navCtrl: NavController,private menu:MenuController, public translateService: TranslateService,
    public user: User,
    public api: Api,
    private launchReview: LaunchReview,
    public alertController:AlertController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    private storage: Storage,
    private faio: FingerprintAIO) {
    var self = this;

    this.platform.ready().then(() => {
      //setTimeout(function(){
        //alert('unnn')
        this.faio.isAvailable().then((result: any) => {
          //alert('emmm')
          // alert('fingerPrintAvailable set to true');
          //alert('avaible')
          //alert(result)
          console.log(result)
          this.fingerPrintAvailable = true;
          this.storage.get('SETTINGS_FINGERPRINT_ENABLED').then((enabled) => {
            if(enabled == false) this.fingerPrintAvailable = false;
          });

        });
      //}, 8000)
    });

    // this.translateServiceClone = this.translateService;

    this.updateTitleStr = "Nouvelle mise à jour disponible !";
    this.updateMessageStr = "Veuillez mettre à jour votre application Daribati"



    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.translateService.get('LOGIN_ERROR_AR').subscribe((value) => {
      this.loginErrorArString = value;
    })


    this.translateService.get('CONNEXION_ERROR').subscribe((value) => {
      this.CnxErrorString = value;
    })

    this.translateService.get('okText').subscribe((value) => {
      this.MSSG_OK = value;
    })

    this.translateService.get('cancelText').subscribe((value) => {
      this.MSSG_CANCEL = value;
    })

    storage.get('LANG').then((lang) => {
      if(lang)
        //this.currentLng = lang
        this.selectLang(lang);

    });

    this.menu.swipeEnable(false);

    this.storage.get('USE_FINGERPRINT').then((useFingerPrint) => {
      if(useFingerPrint && useFingerPrint == "1")
        this.useFingerPrintAuth = true;
    });

    this.storage.get('NORMAL_CONNECTION_SUCCEEDED').then((val) => {
      this.normalConnexionSucceded = val;
    });

    this.storage.get('AUTH_USERNAME').then((auth_username) => {
      if(auth_username) this.auth_username = auth_username;
    });
    this.storage.get('AUTH_PASSWORD').then((auth_password) => {
      if(auth_password) this.auth_password = auth_password;
    });

    this.storage.get('REMEMBER_USERNAME').then((username) => {
      if(username) this.account.username = username;
    });

  }

  ionViewDidLoad() {
    var self = this;

    this.storage.get('SHOW_CHATBOT').then((val) => {
      if(val == false) window.document.getElementById('chatbot-logo').setAttribute("style", "display: none !important");
    })

    //this.checkVersionApp();
    //setTimeout(function(){
    //  self.doLogin()
    //}, 200)

    //self.fingerPrintAvailable = true;

  }

  async checkVersionApp(){

    console.log(this.platform);  

    console.log("Check Daribati Version Store ");


    let seq = this.api.getVersionDaribati().map(resp => resp.json());
    //let headersApiNative = { 'token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/defdeclarationsearch', body, headersApiNative).map(resp => JSON.parse(resp.data));
    
    seq.subscribe((res: any) => {
      
      
     var remoteVersion;
        
      if(this.platform.is('android'))
       remoteVersion = res.version['android'];
      else
       remoteVersion = res.version['ios'];

       console.log("remoteversion : "+remoteVersion);
      /*let toast = this.toastCtrl.create({
        message: "mise à jour disponible à installer",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();*/

      //console.log("Daribati Version Store : "+res.version);
    // alert(remoteVersion);
      
      if ( this.version != remoteVersion) {
        console.log("mise à jour disponible");
         this.showConfirm();

        // this.showConfirm();
      }


    }, err => {
      console.error('ERROR', err);});
  }

  launchStore(platform){
    var appId;
    switch(platform){
      case "ios":
      appId = "1471790321";
      break;
      case "android":
      appId = "ma.tax.dgi.daribati";
      break;
    }

    console.log("platform : "+platform + " ID : "+appId);
    window.cordova.plugins.market.open(appId);
  }


  onUpdateNow() {
    /*this.platform.ready().then(() => {
      if (this.platform.is("ios")) {
        //replace '310633997' with your iOS App ID
        this.openInAppStore('itms-apps://itunes.apple.com/app/310633997'); //call the openInAppStore
      } else if (this.platform.is("android")) {
        //replace 'com.whatsapp.saint' with your Android App ID
        this.market.open("com.whatsapp.saint").then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
      }
    });*/
  }

  openInAppStore(link) {
    let options: InAppBrowserOptions = {
      location: 'yes',//Or 'no' 
    };
    let target = "_blank";
    window.open(link, target);
  }

  async  showConfirm() {
    this.alert = this.alertController.create({
      title: this.updateTitleStr,
      message: this.updateMessageStr,
      buttons: [
      {
        text: this.MSSG_OK,

        handler: () => {

          //this.market.open('1471790321');
          //alert(this.platform.is("ios")?'ios':'android')
          this.launchStore(this.platform.is("ios")?'ios':'android');

          console.log('redirection vers playstore');

        }
      },
      // {
        //   text: 'Ultérieurement',
        //   handler: () => {
          //     console.log('Let me think');
          //   }
          // },
          {
            text: this.MSSG_CANCEL,
            handler: () => {
              console.log('annulation');
            }
          }
          ]
        });
    this.alert.present();
  }

  
  doLogin_() {
    this.navCtrl.push('SettingsPage');
  }

  doLoginFingerPrint() {    
    // this.showConfirm();
    // this.onUpdateNow();
    /*this.faio.isAvailable().then((result: any) => {
      //alert('fingerPrintAvailable set to true');
      this.fingerPrintAvailable = true;
    });*/

    if (!navigator.onLine) {
      //Do task when no internet connection
      let toast = this.toastCtrl.create({
        message: this.CnxErrorString,
        duration: 8000,
        showCloseButton: true,
        closeButtonText:"X",
        dismissOnPageChange:true,
        cssClass: 'toast-network'
        ,
        position: 'bottom'
      });
      toast.present();
      return;

    }


    if(this.fingerPrintAvailable && this.useFingerPrintAuth && this.normalConnexionSucceded){
      this.faio.show({
        clientId: 'Fingerprint-Demo',
        clientSecret: 'password', //Only necessary for Android
        disableBackup:true,  //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate' //Only for iOS
      })
      .then((result: any) => {
        console.log(result)
        let alert = this.alertCtrl.create({
          title: 'Authentification',
          subTitle: 'Vérification réussie !',
          buttons: ['Ok']
        });
        alert.present();

        this.account.username = this.auth_username;
        this.account.password = this.auth_password;

        this.user.login(this.account).subscribe((resp) => {
          if(this.user._user != null){
            this.storage.set("NORMAL_CONNECTION_SUCCEEDED", true);
            this.navCtrl.push(MainPage);
          }
          else{
            this.toastCtrl.create({ message: 'Invalid credential', duration: 3000, position: 'bottom' }).present();
            //this.storage.set("NORMAL_CONNECTION_SUCCEEDED", false);
          }
        }, (err) => {
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
      })
      .catch((error: any) => {
          /*let alert = this.alertCtrl.create({
            title: 'Authentification',
            subTitle: 'Erreur lors de la vérification !',
            buttons: ['Annuler']
          });
          alert.present();*/
        });
    }else{

      if(this.fingerPrintAvailable && this.useFingerPrintAuth && !this.normalConnexionSucceded && !(this.account.username && this.account.password)){
        this.toastCtrl.create({ message: 'Vous devez effectuer une connexion manuelle avant de pouvoir utiliser l empreinte :', duration: 3000, position: 'bottom' }).present();
        return;
      }
      this.user.login(this.account).subscribe((resp) => {
        if(this.user._user != null){

          this.storage.set("USE_FINGERPRINT", "1");
          this.storage.set("AUTH_USERNAME", this.account.username);
          this.storage.set("AUTH_PASSWORD", this.account.password);
          this.storage.set("NORMAL_CONNECTION_SUCCEEDED", true);

          if(this.rememberMe){
            this.storage.set("REMEMBER_USERNAME", this.account.username);
          }else{
            this.storage.set("REMEMBER_USERNAME", null);
          }

          this.navCtrl.push(MainPage);
        }
        else
          this.toastCtrl.create({ message: 'Invalid credential', duration: 3000, position: 'bottom' }).present();
      }, (err) => {
        // Unable to log in
        if ( this.translateService.getBrowserLang() == 'ar') {

          console.log("login error : "+this.loginErrorArString)

        }

        if ( this.translateService.getBrowserLang() == 'fr') {

          console.log("login error : "+this.loginErrorString)

        }
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    }
  }

  doLogin() {    
      this.user.login(this.account).subscribe((resp) => {
        if(this.user._user != null){

          this.storage.set("USE_FINGERPRINT", "1");
          this.storage.set("AUTH_USERNAME", this.account.username);
          this.storage.set("AUTH_PASSWORD", this.account.password);
          this.storage.set("NORMAL_CONNECTION_SUCCEEDED", true);

          if(this.rememberMe){
            this.storage.set("REMEMBER_USERNAME", this.account.username);
          }else{
            this.storage.set("REMEMBER_USERNAME", null);
          }

          this.navCtrl.push(MainPage);
        }
        else
          this.toastCtrl.create({ message: 'Invalid credential', duration: 3000, position: 'bottom' }).present();
      }, (err) => {
        // Unable to log in
        if ( this.translateService.getBrowserLang() == 'ar') {

          console.log("login error : "+this.loginErrorArString)

        }

        if ( this.translateService.getBrowserLang() == 'fr') {

          console.log("login error : "+this.loginErrorString)

        }
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }
  
  redirect(pageName:string ='none'){
    if(pageName == 'none'){
      let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
      this.navCtrl.push(pageName);
    }
  }

  redirectSample(){
    let toast = this.toastCtrl.create({
      message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  redirectAchatTimbre(){
    this.navCtrl.push(AchatTimbrePage);
  } 

  redirectAdhesion(){
    this.navCtrl.push(AdhesionAllPage);
  } 

  redirectMotdepasse(){
    this.navCtrl.push(MotdepassePage);
  } 

  redirectWeb(pageName:string ='none'){
    //console.log(window.open)
    window.open(pageName,'_system');
    //this.iab.create(pageName,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  hideFooter(){
    this.footer = true;
  }

  showFooter(){
    this.footer = false;
  }

  /*showRadioSelectLanguage() {
    let alert = this.alertCtrl.create();
    //alert.setTitle('Choix de la langue');
    alert.addInput({
      type: 'radio',
      label: 'Français',
      value: 'fr',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'العربية',
      value: 'ar',
      checked: false
    });

    alert.addButton(this.MSSG_CANCEL);
    alert.addButton({
      text: this.MSSG_OK,
      handler: data => {
        console.log('data langue :' +data);
        this.storage.set("LANG", data);
        this.selectLang(data);
      }
    });
    alert.present();
  }*/

  showRadioSelectLanguage(myEvent) {
    let popover = this.popoverCtrl.create(LangChooserPopoverPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if(!data) return;
      //console.log(data);
      this.selectLang(data.lang)
    });
  }

  selectLang(lang){
    //this.currentLng = lang;
    this.translateService.use(lang);
    if( lang == 'ar'){
      this.platform.setDir('rtl', true);
      this.loginErrorString = "فشل التّحقق من تسجيل الدخول، خطأ في بيانات الدخول";
      this.updateTitleStr = "تحديث جديد متاح!";
      this.updateMessageStr = "يرجى تحديث تطبيق Daribati الخاص بك";
      this.MSSG_OK = 'تأكيد';
      this.MSSG_CANCEL = "إنسحاب";
    }
    else{
      this.platform.setDir('ltr', true);
      this.loginErrorString = 'Connexion échouée, vérifiez votre login ET/OU motdepasse.';
      this.updateTitleStr = "Nouvelle mise à jour disponible !";
      this.updateMessageStr = "Veuillez mettre à jour votre application Daribati";
      this.MSSG_OK = 'OK';
      this.MSSG_CANCEL = "Annuler";
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
