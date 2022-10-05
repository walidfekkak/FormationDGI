import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

/**
 * Generated class for the TeleServicesPrivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tele-services-private',
  templateUrl: 'tele-services-private.html',
})
export class TeleServicesPrivatePage {

  public teleservices:any = [];
   
  constructor( public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public translate: TranslateService)
   {
     
      // this.teleservices.push({'Simpl-Adhésion':'https://simpl-adhesion.tax.gov.ma/simpladhesion/'});

      // this.teleservices.push({libelle: 'ADHESION_PARTICULIERS_CPU', img:'assets/img/main-menu/teleservices/item3-', url: 'https://cpu.tax.gov.ma/cpu/'});
      this.teleservices.push({libelle: 'Simpl-IS', img:'assets/img/main-menu/teleservices/item7-', url:'https://is.tax.gov.ma/is/'});
      this.teleservices.push({libelle: 'Simpl-TVA', img:'assets/img/main-menu/teleservices/item8-', url:'https://tva.tax.gov.ma/tva/#/login/'});
      this.teleservices.push({libelle: 'Simpl-IR', img:'assets/img/main-menu/teleservices/item10-', url:'https://ir.tax.gov.ma/'});
      this.teleservices.push({libelle: 'Simpl-Enregistrement-Timbre', img:'assets/img/main-menu/teleservices/item11-',  url:'https://simpl-timbre.tax.gov.ma/'});
      this.teleservices.push({libelle: 'ATTESTATIONS', img:'assets/img/main-menu/teleservices/item6-', url:'https://attestation.tax.gov.ma/'});
      this.teleservices.push({libelle: 'RECLAMATION', img:'assets/img/main-menu/teleservices/item12-',  url:'https://reclamation.tax.gov.ma/'});
      this.teleservices.push({libelle: 'Simpl-IR Particuliers', img:'assets/img/main-menu/teleservices/item13-', url:'https://irpart.tax.gov.ma/simplir_part/'});
      this.teleservices.push({libelle: 'Rendez-vous_fiscal', img:'assets/img/main-menu/teleservices/item4-', url:'https://tax.rdv.gov.ma/?page=citoyen.Accueil' });
      this.teleservices.push({libelle: 'RECHERCHE_ENTREPRISE', img:'assets/img/main-menu/teleservices/item5-', url:'https://r-entreprise.tax.gov.ma/rechercheentreprise/'});
      this.teleservices.push({libelle: 'Paiement_vignette', img:'assets/img/main-menu/teleservices/item9-', url:'https://www.mavignette.ma/mv/ma/MTC/formulaire?cid=01&fid=1022'});

   }

   backToPrevious(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeleservicesPage');
  }

  redirect(pageName:string ='none', params = null ){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
      // this.navCtrl.push(pageName, params);
      this.navCtrl.setRoot(pageName,{}, params);

    }
  }

  redirectWeb(pageName:string ='none',params =null){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
       console.log(params.service +" params , items "+params.lien)
      // this.navCtrl.push(params);
      // this.iab.create(params.lien, '_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
      // window.open(params.lien, '_System' ,'location=yes');
      // window.open('http://example.com', '_blank');
      window.open(params.lien,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

    }
  }

  keys(obj){
    return Object.keys(obj);
}

goToView(viewName){
  this.navCtrl.push(viewName);

}


logout(){
  //this.navCtrl.pop();
  this.navCtrl.push('LoginPage');
}

}
