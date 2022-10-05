import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, ResponseOptions, ResponseType } from "@angular/http"

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiNative {
 // LINK PROD 
url: string = 'https://simpl-cf-mob.tax.gov.ma/compte_fiscal/rest';

// LINK QUALIF
// url: string = 'https://simpl-qualif.tax.gov.ma/compte_fiscal/rest';

//LINK LOCAL 
// url: string = 'http://localhost:8080/compte-fiscal-tma/rest';

//LINK LOCAL 
// url: string = 'http://192.168.250.20:9080/comptefiscal228/rest';

  constructor(private toastCtrl: ToastController, public http: HTTP, public loadingController : LoadingController, public alertCtrl : AlertController) {
    this.http.setRequestTimeout(30);
  }

  get(endpoint: string, body: any, reqOpts?: any) {
    var self = this;

    if (!navigator.onLine) {
      //Do task when no internet connection
      
      let toast = this.toastCtrl.create({
        message: "Veuillez vérifiez votre connexion réseau et réessayer.",
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


    var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
    showBackdrop:true,
    enableBackdropDismiss :true});
    loadingIndicator.present();

    let observe =  Observable.fromPromise(this.http.get(this.url + '/' + endpoint, body, reqOpts));
    let req = observe.share();

    req.subscribe(
      (res: any) => {
          
          let reponseBody = res;
          console.log(reponseBody);
          // window.open(reponseBody.URL,'_System','Lo')
          loadingIndicator.dismiss();

          if (reponseBody.search('REJETEE') != -1 ) {
              const prompt = self.alertCtrl.create({
                  title: 'Erreur : Requête rejetée',
                  // message : 'Erreur lors de la tentative de communication avec le serveur !'
                  message:'Veuillez réessayer ultérieurement. Si l\'erreur persiste, merci de contacter la DGI.'
                 });
              prompt.present();
              
              let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
              return Observable.throw( contentError );
          }

          if (reponseBody.search('maintenance') != -1 ) {

              const prompt = self.alertCtrl.create({
                  title: 'INFO',
                  // message : 'Erreur lors de la tentative de communication avec le serveur !'
                  message:'Le service est actuellement en maintenance. Veuillez réessayer ultérieurement.'
                 });

              prompt.present();
              
              let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
              return Observable.throw( contentError );
          }
          if (reponseBody.search('Erreur 500') != -1 ) {
              const prompt = self.alertCtrl.create({
                  title: 'Erreur 500 : ',
                  // message : 'Erreur lors de la tentative de communication avec le serveur !'
                  message:'Veuillez réessayer ultérieurement. Si l\'erreur persiste, merci de contacter la DGI.'
                 });
              prompt.present();
              
              let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
              return Observable.throw( contentError );
          }
          // Une erreur interne s'est produite. Veuillez réessayer ultérieurement.<br /> Si l'erreur persiste, merci de contacter la DGI.
      },
          error => {
              // console.log(error);
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  console.log("here we are 400");
                  const prompt = self.alertCtrl.create({
                      title: '<p style="color:red"> Erreur </p>',
                      // message : 'Erreur lors de la tentative de communication avec le serveur !'
                      message:'<span>Veuillez réessayer ultérieurement.</span>'
                     });
                     prompt.present();
                  
                     let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                     console.log(contentError);
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 412) {
                  const prompt = self.alertCtrl.create({
                      title: '<p style="color:red"> Erreur </p>',
                      // message : 'Erreur lors de la tentative de communication avec le serveur !'
                      message:'<span>Veuillez vérifier votre reférence.</span>'
                     });
                     prompt.present();
                  
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
          }
      );
    
    return    observe.share();
  }


  // post(endpoint: string, body: any, reqOpts?: any) {
  //   return Observable.fromPromise(this.http.post(this.url + '/' + endpoint, body, reqOpts));
  // }

  post(endpoint: string, body: any, reqOpts?: any) {

    if (!navigator.onLine) {
      //Do task when no internet connection
      let toast = this.toastCtrl.create({
        message: "Veuillez vérifiez votre connexion réseau et réessayer.",
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

    var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
    showBackdrop:true,
    enableBackdropDismiss :true});
    loadingIndicator.present();
    let observe = Observable.fromPromise(this.http.post(this.url + '/' + endpoint, body, reqOpts));
    

    observe.subscribe((res:any) =>  {
      loadingIndicator.dismiss();
      console.log(res);
    }, error =>{
      loadingIndicator.dismiss();
    } )
    return observe;
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return Observable.fromPromise(this.http.put(this.url + '/' + endpoint, body, reqOpts));
  }

  // delete(endpoint: string, reqOpts?: any) {
  //   return this.http.delete(this.url + '/' + endpoint, reqOpts);
  // }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return Observable.fromPromise(this.http.patch(this.url + '/' + endpoint, body, reqOpts));
  }

  
}
