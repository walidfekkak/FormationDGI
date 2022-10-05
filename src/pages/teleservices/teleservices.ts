import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdhesionCpuPage } from '../adhesion-cpu/adhesion-cpu';
import { AdhesionPage } from '../adhesion/adhesion';
// import { ScanAttestationPage } from '../scan-attestation/scan-attestation';

@IonicPage()
@Component({
  selector: 'page-teleservices',
  templateUrl: 'teleservices.html',
})
export class TeleservicesPage {

  public teleservices:any = [];

  public teleservicesAds:any = [];
  public teleservicesAdsCpu:any = [];
  lang: any;

   
  constructor(  private storage:Storage,private menu:MenuController,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController, public translate: TranslateService)
  {

    storage.get('LANG').then((lang) => {
      this.lang = lang;
    });

    // this.teleservices.push({libelle: 'ADHESION_PARTICULIERS_CPU', img:'assets/img/main-menu/teleservices/item2-', url: 'https://simpl-adhesion.tax.gov.ma/simpladhesion_aleg/process/inscriptionCPU' });
    // this.teleservices.push({libelle: 'ADHESION_PARTICULIER', img:'assets/img/main-menu/teleservices/item3-', url: 'https://simpl-adhesion.tax.gov.ma/simpladhesion_aleg/'});

    this.teleservicesAds.push({libelle: 'ADHESION_PARTICULIERS_CPU', img:'assets/img/main-menu/teleservices/item2-' });
    this.teleservicesAdsCpu.push({libelle: 'ADHESION_PARTICULIER', img:'assets/img/main-menu/teleservices/item3-'});
    this.teleservices.push({libelle: 'Rendez-vous_fiscal', img:'assets/img/main-menu/teleservices/item4-', url: 'https://tax.rdv.gov.ma/?page=citoyen.Accueil' });
    this.teleservices.push({libelle: 'RECHERCHE_ENTREPRISE', img:'assets/img/main-menu/teleservices/item5-', url: 'https://r-entreprise.tax.gov.ma/rechercheentreprise/'});
    this.teleservices.push({libelle: 'Paiement_vignette', img:'assets/img/main-menu/teleservices/item9-', url: 'https://www.mavignette.ma/mv/ma/MTC/formulaire?cid=01&fid=1022'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeleservicesPage');
  }

  redirect(pageName:string ='none',params =null){
    if(pageName == 'none'){
        let toast = this.toastCtrl.create({
        message: "La logique de click n'est pas encore prête ! L'équipe de dév travail dessus...",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();  
    }else{
     

    if ( pageName == 'Rendez-vous_fiscal') {
        console.log(pageName +" params , items "+params.lien);
      
          if(this.lang == 'ar')

          window.open( 'https://tax.rdv.gov.ma/index.php?page=citoyen.Accueil&lang=ar','_system');
          
       else 
        window.open('https://tax.rdv.gov.ma/index.php?page=citoyen.Accueil&lang=fr','_system');
      return;
    }

    if ( pageName == 'ADHESION_PARTICULIERS_CPU') {
      console.log(pageName +" params , items "+params.lien);
      // this.redirectAdhesionCPU();
      this.navCtrl.push(AdhesionPage);

    return;
  }

  if ( pageName == 'ADHESION_PARTICULIER') {
    console.log(pageName +" params , items "+params.lien);
    // this.redirectAdhesion();

    this.navCtrl.push(AdhesionPage);

  return;
}

      // this.navCtrl.push(params);
      // this.iap.create(params.lien, '_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');
      // window.open(params.lien, '_System' ,'location=yes');
        window.open(params.lien,'_blank','location=yes,EnableViewPortScale=yes,zoom=yes,closebuttoncaption=Retour');

    }
  }

  keys(obj){
    return Object.keys(obj);
}

goToView(viewName){
   this.navCtrl.push(viewName);

}

ionViewWillLeave() {
  // Don't forget to return the swipe to normal, otherwise 
  // the rest of the pages won't be able to swipe to open menu
  this.menu.swipeEnable(true);

  // If you have more than one side menu, use the id like below
  // this.menu.swipeEnable(true, 'menu1');
 }

 redirectAdhesion(){
  this.navCtrl.push(AdhesionPage);
} 

redirectAdhesionCPU(){
  this.navCtrl.push(AdhesionCpuPage);
} 

}
