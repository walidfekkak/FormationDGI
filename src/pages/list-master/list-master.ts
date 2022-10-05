import { Component } from '@angular/core';
import { ToastController, MenuController, } from 'ionic-angular';
import { IonicPage, ModalController, NavController , Platform } from 'ionic-angular';
import { trigger, state, style, transition, group, query, animate, animateChild, AUTO_STYLE } from '@angular/animations'
import { TranslateService } from '@ngx-translate/core';
import { AchatTimbrePage } from '../achat-timbre/achat-timbre'

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item';
import { Items, Api, ApiNative } from '../../providers';
import { User } from '../../providers';
import { RequestOptions ,Headers } from '@angular/http';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html',
  animations: [


    trigger('blurAnimation', [
        state('blur', style({
            filter: 'blur(8px)',
        })),
        state('noBlur', style({
            filter: 'blur(0)',
        })),
        transition('noBlur <=> blur', animate('100ms ease-in')),
    ]),

    trigger('container', [
      transition(':enter', [
          style({opacity: '0'}),
          group([
            animate('200ms ease-out', style({opacity: '1'})),
            query('@badge, @message, @content', [
              animateChild()
            ])
          ])
          
      ]),
      transition(':leave', [
          group([
            animate('200ms ease-out', style({opacity: '0',  filter: 'blur(0px)'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])
      ])
    ]),

    trigger('badge', [
        transition(':enter', [
            style({transform: 'translateY(-200%)'}),
            animate('200ms ease-out', style({transform: 'translateY(0)'}))
        ]),
        transition(':leave', [
            animate('200ms ease-in', style({transform: 'translateY(-200%)'}))   
        ])
    ]),

    trigger('message', [
      transition(':enter', [
          //style({filter: 'blur(20px)',}),
          //animate('500ms 500ms ease-out', style({filter: 'blur(0)'}))
      ]),
      transition(':leave', [
          animate('500ms ease-in', style({opacity: '0'}))   
      ])
    ]),

    trigger('content', [
      transition(':enter', [
          //style({filter: 'blur(0)',}),
          //animate('500ms 1000ms ease-out', style({filter: 'blur(50px)'}))
      ]),
      transition(':leave', [
          //animate('500ms ease-in', style({opacity: '0'}))   
      ])
    ])

  ]
})



export class ListMasterPage {

  public displayOverlayMenu: boolean = false;
  blurState: string = 'noBlur';
  currentItems: Item[];
  displayFooter: boolean = true;
  data: any;
  dataKeys: any;

  groupBy :any = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
  

  constructor(public platform:Platform,public navCtrl: NavController,private menu:MenuController,
     public user: User, public items: Items, public modalCtrl: ModalController, 
     private toastCtrl: ToastController ,public api:Api , private apiNative : ApiNative,
     public translateService: TranslateService) {

      // if(this.translateService.currentLang =='ar') {
      //   this.platform.setDir('rtl',true);
      //   this.platform.ready().then(() => {
      //   this.menu.toggle('left');
      //   });
      //   console.log('rtl');
      // } else {
      //   this.platform.setDir('ltr',true);
      //   this.platform.ready().then(() => {
      //   this.menu.toggle('right');
      //   });
      //   console.log('ltr');
      // }

    this.currentItems = this.items.query();    
    console.log(this.user);
    if(!('_user' in this.user))
      this.navCtrl.push('LoginPage');
      this.loadData();
     }

  loadData(){
    const headers = new Headers();

    headers.append('token', this.user.token);
    headers.append('username', this.user.username);
    // headers.append();
    let body = { idFiscal : this.user._user.identifiantFiscal, 
                 //dateTo : '20170622',
                 dateTo :  new DatePipe('en-US').transform(new Date().toISOString(), 'yyyyMMdd'),
                 //dateFrom : '20130101', 
                 dateFrom : '20160101',
                 typeImpot:  '' };
                 console.log("date I : "+body.dateTo);

    const options = new RequestOptions({headers: headers, params : body});

    let seq = this.api.get('providers/declarationsearch', body, options).map(resp => resp.json());
    //let headersApiNative = { 'token' : this.user.token, 'username' : this.user.username};
    //let seq = this.apiNative.get('providers/declarationsearch', body, headersApiNative).map(resp => JSON.parse(resp.data));

    seq.subscribe((res: any) => {
      this.data = res.data;
      if(!this.data) this.data = [];
      /*
      this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2020', _dateDebutPeriode: '1-11-2018' ,numeroDepot: '6446894', _dateHeureAccuseReception: '01-12-2018', dateFinImpoLettre: '01-01-2021'})
      this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2020', _dateDebutPeriode: '1-11-2018', dateFinImpoLettre: '01-01-2021'})
      this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
      this.data.push({codeTypeImpot: 'TVA', modele: 'ddd', dateDebutImpLettre: '01-01-2019', _dateDebutPeriode: '1-11-2017', dateFinImpoLettre: '01-01-2021'})
      */

      this.data.forEach(function(e){
        e.expanded = false;
        //e.year = e._dateDebutPeriode.substring(e._dateDebutPeriode.length - 4, e._dateDebutPeriode.length )
        e.year = e.dateDebutPeriode.year
        //console.log('year : ' + e.year)
      })

      const groupByYear = this.groupBy('year');

      this.data = groupByYear(this.data);
      this.dataKeys = Object.keys(this.data);
      this.dataKeys = this.dataKeys.reverse();
      //console.log('this.data')
      //console.log(this.data)
      
    }, err => {
      console.error('ERROR', err);});
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  animateMenu(){

    this.blurState = (this.blurState === 'blur' ? 'noBlur' : 'blur');
    console.log('innn')
    this.displayOverlayMenu = !this.displayOverlayMenu;

  }

  animateMenuTest(){

   console.log("TEST GONE");

  }

  backToPrevious(){
    this.navCtrl.pop();
    this.displayFooter = false;
  }

  logout(){
    //this.navCtrl.pop();
    this.navCtrl.push('LoginPage');
    this.displayFooter = false;
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

  redirectAchatTimbre(){
    this.navCtrl.push(AchatTimbrePage);
  } 

  redirectWeb(pageName:string ='none'){
   
     window.open(pageName,'_system');
    
  }

  showDetails(item){
    item.expanded = !item.expanded
  }

}
