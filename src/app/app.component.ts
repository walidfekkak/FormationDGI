import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, AlertController, ToastController } from 'ionic-angular';
// import { Network } from '@ionic-native/network/ngx';
import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { timer } from 'rxjs/observable/timer';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// @Component({
//   template: `<ion-menu [content]="content" [side]="(platform.dir() == 'rtl') ? 'right' : 'left'">
//     <ion-content>
//       <ion-list>
//         <button menuClose ion-item (click)="openPage(p)" [ngClass]="p.className" [ngClass]="p.className" *ngFor="let p of pages">
//           <img [src]="'assets/img/' + p.iconUrl" class="icon" [ngStyle]="{'display' : p.iconUrl != '' ? 'initial' : 'none'}"/> {{p.title | translate}}
//         </button>
//       </ion-list>
//     </ion-content>
//   </ion-menu>
//   <ion-nav #content [root]="rootPage"></ion-nav>`
// })

@Component({
  template: `<ion-menu *ngIf="this.platform.dir()==='rtl'" 
  side="right"
  [content]="content">
    <ion-content>
      <div><img src="assets/img/logo/splash-screen-logo-new.png" style="width: 130px;"/></div>
      <ion-list>
        <button menuClose ion-item (click)="openPage(p)" [ngClass]="p.className" [ngClass]="p.className" *ngFor="let p of pages">
          <img [src]="'assets/img/' + p.iconUrl" class="icon" [ngStyle]="{'display' : p.iconUrl != '' ? 'initial' : 'none'}"/> {{p.title | translate}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>
  
  <ion-menu *ngIf="this.platform.dir()==='ltr'" 
  side="left"
  [content]="content">
    <ion-content>
      <div><img src="assets/img/logo/splash-screen-logo-new.png" style="width: 130px;"/></div>
      <ion-list>
        <button menuClose ion-item (click)="openPage(p)" [ngClass]="p.className" [ngClass]="p.className" *ngFor="let p of pages">
          <img [src]="'assets/img/' + p.iconUrl" class="icon" [ngStyle]="{'display' : p.iconUrl != '' ? 'initial' : 'none'}"/> {{p.title | translate}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-nav [swipeGesture]="false" #content [root]="rootPage"></ion-nav>`
})


  // <div id="chatbot-logo" absolute-drag startLeft="20" startTop="40"><div><img  src="assets/img/chatbot.png"/></div></div>
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages_copy: any[]

  pages: any[] = [
    { iconUrl : '', title: "MES_DONNEES", component: '', className : 'groupItem' },
  
    { iconUrl : 'menu/identifications.png', title: 'DONNEES_IDENTIFICATION', component: 'IdentificationDataPage', className : 'simpleItem' },
  
    { iconUrl : '', title: "MES_OPERATIONS", component: '', className : 'groupItem' },
     
    //{ iconUrl : 'menu/identifications.png', title: "Données d'intentification", component: 'IdentificationDataPage', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'DECLARATIONS', component: 'DeclarationsListPage', className : 'simpleItem' },
    { iconUrl : 'menu/versement.png', title: 'VERSEMENTS', component: 'VersementsPage', className : 'simpleItem' },
    { iconUrl : 'menu/avis-impositions.png', title: 'TAXES_LOCALES', component: 'AvisImpositionPage', className : 'simpleItem' },
    { iconUrl : '', title: "MES_DEMANDES", component: '', className : 'groupItem' },
    { iconUrl : 'menu/remboursement.png', title: 'REMBOURSEMENTS', component: 'RemboursementsPage', className : 'simpleItem' },
    { iconUrl : 'menu/restitutions.png', title: 'RESTITUTIONS', component: 'RestitutionsPage', className : 'simpleItem' },
    { iconUrl : '', title: "MES_OBLIGATIONS", component: '', className : 'groupItem' },
    { iconUrl : 'menu/restitutions.png', title: 'DEFAULT_DECLARATIONS', component: 'DefautDeclarationsPage', className : 'simpleItem' },
    { iconUrl : 'menu/reste-a-payer.png', title: 'RESTE_A_PAYER', component: 'ResteAPayerPage', className : 'simpleItem' },
    { iconUrl : '', title: 'RECLAMATION', component: 'ReclamationPage', className : 'groupItem' },
    { iconUrl : 'menu/declaration.png', title: 'SUIVI_RECLAMATION', component: 'ReclamationPage', className : 'simpleItem' },
    { iconUrl : '', title: "ATTESTATIONS", component: '', className : 'groupItem' },
    { iconUrl : 'menu/declaration.png', title: 'ATTESTATION D’INSCRIPTION A LA TAXE PROFESSIONNELLE', component: 'Attestation1Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'BULLETIN_NOTIF', component: 'Attestation2Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'ATTESTATION DU CHIFFRE D’AFFAIRES DECLARE', component: 'Attestation3Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'ATTESTATION DE REGULARITE FISCALE', component: 'Attestation4Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'Attestation de revenu', component: 'Attestation5Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'ATTESTATION DE RADIATION DE LA TAXE PROFESSIONNELLE', component: 'Attestation6Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'AttestationExoPCompl', component: 'Attestation7Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'AttestationIMPOTH', component: 'Attestation9Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'AttestationExoTva', component: 'Attestation8Page', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'AttestationCAE', component: 'AttestationCaePage', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'AttestationVL', component: 'AttestationVlPage', className : 'simpleItem' },
    { iconUrl : '', title: "SETTINGS", component: '', className : 'groupItem' },
    { iconUrl : 'menu/settings.png', title: 'SETTINGS', component: 'SettingsPage', className : 'simpleItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'AttestationExoPCompl', component: 'Attestation9Page', className : 'simpleItem' },

    // { iconUrl : '', title: "Mes attestations", component: '', className : 'groupItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Inscription à la TP', component: 'ContentPage', className : 'simpleItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Bulletin de notification IF', component: 'ContentPage', className : 'simpleItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Chiffre d\'affaires', component: 'ContentPage', className : 'simpleItem' },
    // //{ iconUrl : 'menu/restitutions.png', title: 'Chiffre d\'affaires', component: 'AchatTimbrePage', className : 'simpleItem' },
    //{ iconUrl : 'menu/notifications.png', title: 'Notifications', component: 'ContentPage', className : 'simpleItem' },
    //{ iconUrl : '', title: "Data & Statistiques", component: '', className : 'groupItem' },
    //{ iconUrl : 'menu/calendrier.png', title: 'Calendrier fiscal', component: 'ContentPage', className : 'simpleItem' },
  ]
  showSplash: boolean = true;
  MSSG_CNX: string;

  constructor(private toastCtrl:ToastController,private alertCtrl:AlertController,private translate: TranslateService, public platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public events: Events, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#ffffff');
      // timer(3000).subscribe( ()=> this.showSplash = false);
      // this.network.onConnect().subscribe(()=> {
      //   console.log('Connected ionViewDidLoad');
      // });

      // this.network.onDisconnect().subscribe(()=> {
      //   console.log('Disonnected ionViewDidLoad');
      // });
      this.translate.get('MSSG_CNX').subscribe((value) => {
        this.MSSG_CNX = value;
      })

      this.pages_copy = [...this.pages];
  
      if (!navigator.onLine) {
        //Do task when no internet connection
        let toast = this.toastCtrl.create({
          message: this.MSSG_CNX,
          duration: 9000,
          showCloseButton: true,
          closeButtonText:"X",
          dismissOnPageChange:true,
          cssClass: 'toast-network',
          position: 'bottom'
        });
        toast.present();
        return;
         
      }

      this.storage.get('show_attestation_1').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'ATTESTATION DU CHIFFRE D’AFFAIRES DECLARE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_2').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'ATTESTATION DE RADIATION DE LA TAXE PROFESSIONNELLE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_3').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'AttestationIMPOTH')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_4').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'BULLETIN_NOTIF')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_5').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'ATTESTATION D’INSCRIPTION A LA TAXE PROFESSIONNELLE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_7').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'Attestation de revenu')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_6').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'ATTESTATION DE REGULARITE FISCALE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_8').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'AttestationExoPCompl')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.storage.get('show_attestation_9').then((shown) => {
        if(shown == null) return;
        this.pages_copy.filter(e => e.title == 'AttestationExoTva')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });
 
      this.events.subscribe('show_attestation_1', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'ATTESTATION DU CHIFFRE D’AFFAIRES DECLARE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_2', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'ATTESTATION DE RADIATION DE LA TAXE PROFESSIONNELLE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_3', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'AttestationIMPOTH')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_4', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'BULLETIN_NOTIF')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_5', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'ATTESTATION D’INSCRIPTION A LA TAXE PROFESSIONNELLE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_7', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'Attestation de revenu')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_6', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'ATTESTATION DE REGULARITE FISCALE')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_8', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'AttestationExoPCompl')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });

      this.events.subscribe('show_attestation_9', (shown) => {
        console.log('triggered ' + shown)
        this.pages_copy.filter(e => e.title == 'AttestationExoTva')[0].hidden = !shown
        var array = this.pages_copy.filter(e => !e.hidden)
        this.pages = [...array];
      });


    });
    this.initTranslate();
  }

  initTranslate() {
    var self = this;
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('ar');
    const browserLang = this.translate.getBrowserLang();
    console.log('browser lang :'+browserLang)

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use('fr');
      }
    } else {
      this.translate.use('fr'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
 