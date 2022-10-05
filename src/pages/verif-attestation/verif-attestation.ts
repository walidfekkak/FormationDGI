import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Api, ApiNative } from '../../providers';
import { User } from '../../providers';
//import { HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import {LoginPage} from '../login/login'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { TranslateService } from '@ngx-translate/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-verif-attestation',
  templateUrl: 'verif-attestation.html',
})
export class VerifAttestationPage {
  /*type: any='BulletinIF';
  identifiant: any ='1004107' ;
  annee: any = '2021';
  code_verification: any ='8e2feaf7874ac';*/
  type: any='';
  identifiant: any ='' ;
  annee: any = '';
  code_verification: any ='';
  fileTransfer: FileTransferObject;


  	constructor(private barcodeScanner: BarcodeScanner, public translateService:TranslateService,public loadingController : LoadingController,public navCtrl: NavController, public navParams: NavParams,
    public api: Api, public apiNative: ApiNative , public user: User,private toastCtrl:ToastController ,
    private transfer: FileTransfer, private file: File, private fileOpener: FileOpener) {

  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad VerifAttestationPage');
      var params = this.navParams.get('params') || null;

      if(params){
        this.type = params.type;
        this.identifiant = params.identifiant;
        this.code_verification = params.code_verification;
        this.annee = params.annee;
        this.submit();
      }
  	}


    submit(){
      const headers = new Headers();

      let body = { 
        idFiscal: this.identifiant,
        typeAttestation: this.type,
        annee: this.annee,
        codeVerif: this.code_verification
      };

      const options = new RequestOptions({headers: headers, params : body});

      let seq = this.api.getAttestation('verifieAttestations', body, options, 'attestations/rest').map(resp => resp.json());

      seq.subscribe((res: any) => {
        console.log(res);

        if(res.status_code == 302){
          this.toastCtrl.create({
              message: 'Attesation trouvée ' + res.message,
              duration: 3000
          }).present();

          let  codeAttestation = res.message;

          let urlPdf = this.api.getUrl('TelechargerAttestationExoP','attestations/rest');
          urlPdf+= '?pdfID='+ codeAttestation;  
          this.fileTransfer= this.transfer.create();
          this.fileTransfer.download(urlPdf, this.file.dataDirectory + 'attestation'+ codeAttestation +'.pdf').then((entry) => {
              console.log('download complete: ' + entry.toURL());
              console.log('fileOpener: ' + entry.toURL());
              this.fileOpener.open(entry.toURL(), 'application/pdf');
              
              //this.fileOpener.open(entry.toURL(), 'application/pdf')
              //.then(() => console.log('File is opened'))
              //.catch(e => console.log('Error opening file', e));
              
          }, (error) => {
            // handle error
            console.log(error);
          });

        }else if(res.status_code == 404){
          this.toastCtrl.create({
              message: 'Attesatin non trouvée ',
              duration: 3000
          }).present();
        }else{
          this.toastCtrl.create({
              message: 'Unhandled status code ' + res.status_code,
              duration: 3000
          }).present();
        }
        
      }, err => {
        console.error('ERROR', err);
        console.log(err);
        let toast = this.toastCtrl.create({
            message: 'Vos données sont incorrectes. Merci de réessayer.'
           , duration: 3500,
            position: 'bottom'
          });
          toast.present();
      });
    }

      scanQRCode(){


    this.barcodeScanner.scan({formats: 'QR_CODE', prompt : "Placez le code QR dans le cadre de scan",
        resultDisplayDuration: 0
    }).then((barcodeData) => {
        console.log(barcodeData)
        //alert(barcodeData.text)
        //var url = "http://10.86.22.205:9080/verifAttest//verifyAttest.do?method=verify&type=DMOMV&annee=2021&numSerie=6d51fd6b4b976a&ifu=T204845";
        //var url =  "http://10.86.22.205:9080/verifAttest//verifyAttest.do?method=verify&type=DIE&annee=2021&numSerie=b3dc9131b59e14&ifu=G256598"
        //var url =  "http://192.168.250.20:9080/verifAttest/verifyAttest.do?method=verify&type=AttestationCA&annee=2021&numSerie=207f5e3f9eb5e&ifu=1004107"
        //var url =  "http://192.168.250.20:9080/verifAttest/verifyAttest.do?method=verify&type=AttestationCA&annee=2021&numSerie=207f5e3f9eb5e&ifu=1004107"
        //var url =  "http://192.168.250.20:9080/verifAttest/verifyAttest.do?method=verify&type=AttestationREGF&annee=2021&numSerie=207ef5f362829&ifu=1004107"
        //var url =  "http://192.168.250.20:9080/verifAttest/verifyAttest.do?method=verify&type=AttestationExoLS&annee=2021&numSerie=208173b6b4887&ifu=40393781"
        var url = barcodeData.text;
        //url = url.replace('http://192.168.250.20:9080/verifAttest/verifyAttest.do?method=verify&', '')
        url = url.substring(url.indexOf("&") + 1, url.length)
        console.log('url')
        console.log(url)
        var params = url.split('&')
        console.log('params')
        console.log(params)
        if(params.length < 4){
          this.toastCtrl.create({
              message: "Code QR invalide",
              cssClass: 'danger',
              duration: 2000,
            }).present();
          return;
        }
        
        var type = params[0].split('=')[1];
        var annee = params[1].split('=')[1];
        var numSerie = params[2].split('=')[1];
        var ifu = params[3].split('=')[1];

        this.type = type;
        this.identifiant = ifu;
        this.code_verification = numSerie;
        this.annee = annee;

        this.submit();

        /*var params1 = {
          type: type,
          identifiant: ifu,
          code_verification: numSerie,
          annee: annee,
        }
        this.navCtrl.push('VerifAttestationPage', {params: params1});*/

          //self.barcode = "6111242923140"; // 4823077625572 // @TEST
          //self.barcode = barcodeData.text;
          //self.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
          //self.searchForProduct(self.barcode);
       // Success! Barcode data is here
      }, (err) => {
          // An error occurred
          this.toastCtrl.create({
            message: "Erreur lors de l'appel du scanner",
            cssClass: 'danger',
            duration: 2000,
          }).present();
          //self.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      });

  }
	
}
