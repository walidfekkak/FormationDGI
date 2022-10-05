import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController, NavParams, ViewController, ToastController, MenuController, AlertController, LoadingController, PopoverOptions } from 'ionic-angular';
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
  selector: 'page-lang-chooser-popover',
  templateUrl: 'lang-chooser-popover.html',
})

export class LangChooserPopoverPage {


  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService){
    
  }

  selectLang(lang){
    this.viewCtrl.dismiss({lang: lang });
  }
  
}