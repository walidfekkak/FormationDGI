import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import { DatePipe } from '@angular/common';

@Component({
  template: `<ion-menu [content]="content">
    <ion-content>
      <ion-list>
        <button menuClose ion-item (click)="openPage(p)" [ngClass]="p.className" [ngClass]="p.className" *ngFor="let p of pages">
          <img [src]="'assets/img/' + p.iconUrl" class="icon" [ngStyle]="{'display' : p.iconUrl != '' ? 'initial' : 'none'}"/> {{p.title}}
        </button>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { iconUrl : '', title: "Mes dépôts", component: '', className : 'groupItem' },
    //{ iconUrl : 'menu/identifications.png', title: "Données d'intentification", component: 'IdentificationDataPage', className : 'simpleItem' },
    { iconUrl : 'menu/declaration.png', title: 'Déclarations', component: 'DeclarationsListPage', className : 'simpleItem' },
    { iconUrl : 'menu/versement.png', title: 'Versements', component: 'VersementsPage', className : 'simpleItem' },
    { iconUrl : '', title: "Mes demandes", component: '', className : 'groupItem' },
    { iconUrl : 'menu/remboursement.png', title: 'Remboursement', component: 'RemboursementsPage', className : 'simpleItem' },
    { iconUrl : 'menu/restitutions.png', title: 'Restitutions', component: 'RestitutionsPage', className : 'simpleItem' },
    { iconUrl : '', title: "Mes obligations", component: '', className : 'groupItem' },
    { iconUrl : 'menu/restitutions.png', title: 'Défaut de déclarations', component: 'DefautDeclarationsPage', className : 'simpleItem' },
    { iconUrl : 'menu/reste-a-payer.png', title: 'Reste à payer', component: 'ResteAPayerPage', className : 'simpleItem' },
    // { iconUrl : '', title: "Mes attestations", component: '', className : 'groupItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Inscription à la TP', component: 'ContentPage', className : 'simpleItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Bulletin de notification IF', component: 'ContentPage', className : 'simpleItem' },
    // { iconUrl : 'menu/restitutions.png', title: 'Chiffre d\'affaires', component: 'ContentPage', className : 'simpleItem' },
    
    //{ iconUrl : 'menu/notifications.png', title: 'Notifications', component: 'ContentPage', className : 'simpleItem' },
    //{ iconUrl : '', title: "Data & Statistiques", component: '', className : 'groupItem' },
    //{ iconUrl : 'menu/calendrier.png', title: 'Calendrier fiscal', component: 'ContentPage', className : 'simpleItem' },

  ]


  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
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
