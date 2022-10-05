import { Component } from '@angular/core';
import { IonicPage,PopoverController, NavController, NavParams, ViewController, ToastController, MenuController, AlertController, LoadingController, PopoverOptions } from 'ionic-angular';
import { faInfoCircle, faCreditCard, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateService } from '@ngx-translate/core';
// import { EmailValidatorProvider } from '../../providers/email-validator/email-validator';
import { Validators, EmailValidator, FormGroup, FormControl } from '@angular/forms';

declare var SMSReceive: any;

@IonicPage()
@Component({
  selector: 'page-calendar-popover',
  templateUrl: 'calendar-popover.html',
})

export class CalendarPopoverPage {

  filter : any = {from : '2022-06-04', to: '2022-07-01' , type : null};
  initial_date_from: string = '';
  initial_date_to: string = '';
  fromDates : any;
  toDates : any;

  constructor(public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams){
    this.filter.from = navParams.get('from');
    this.filter.to = navParams.get('to');

    this.initial_date_from = this.filter.from
    this.initial_date_to = this.filter.to

    this.fromDates = [this.convertDateToObj(this.filter.from) ];
    this.toDates = [ this.convertDateToObj(this.filter.to)];

  }

  convertDateToObj(strDate){
    var splittedVal = strDate.split('-');
    var obj = {
        year: parseInt(splittedVal[0]),
        month: parseInt(splittedVal[1])-1,
        date: parseInt(splittedVal[2])
      }
    //console.log(obj)
    return obj
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchatTimbrePage');
 
    //this.menu.swipeEnable(false);
  }

  onDayFromSelect(e){
    console.log(e)
    this.filter.from = e.year + '-' + this.zeroPad((e.month +1),2) + '-' + this.zeroPad(e.date, 2);
    console.log(this.filter.from)
  }

  onDayToSelect(e){
    console.log(e)
    this.filter.to = e.year + '-' + this.zeroPad((e.month +1),2) + '-' + this.zeroPad(e.date, 2);
    console.log(this.filter.to)
  }

  submit(){
    this.viewCtrl.dismiss({from: this.filter.from, to: this.filter.to });
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
  
}