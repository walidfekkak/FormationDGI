import { Http, Request, RequestOptions, RequestOptionsArgs, Response, ResponseOptions, ResponseType , XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"
import "rxjs/add/operator/timeout";

@Injectable()
export class HttpInterceptor extends Http {
    toastCtrl: any;
    //loadingIndicator : any;

    private error500_String: string;
    private error500_MSG_String: string;
    private error1_String: string;
    private error_1_MSG_String: string;
    private error2_String: string
    private error_2_MSG_String: string;
    private error3_String: string;
    private error_3_MSG_String: string;

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        public loadingController : LoadingController,
        public alertCtrl : AlertController,
        public translateService: TranslateService) {
        super(backend, options)

        this.translateService.get('ERREUR_500').subscribe((value) => {
          this.error500_String = value;
        });
        this.translateService.get('ERREUR_500_MSG').subscribe((value) => {
          this.error500_MSG_String = value;
        });
        this.translateService.get('ERREUR_1_MSG').subscribe((value) => {
          this.error_1_MSG_String = value;
        });
        this.translateService.get('ERREUR_1').subscribe((value) => {
          this.error1_String = value;
        });
        this.translateService.get('ERREUR_2_MSG').subscribe((value) => {
          this.error_2_MSG_String = value;
        });
        this.translateService.get('ERREUR_2').subscribe((value) => {
          this.error2_String = value;
        });
        this.translateService.get('ERREUR_3_MSG').subscribe((value) => {
          this.error_3_MSG_String = value;
        });
        this.translateService.get('ERREUR_3').subscribe((value) => {
          this.error3_String = value;
        });
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        // @FIXME : add an option to disable loadingIndicator for some specific http request
      
        var self = this;

        console.log("current langue : "+this.translateService.store.currentLang  );    
if(this.translateService.store.currentLang == 'ar') { 
       this.error500_String = "خطأ";
        this.error500_MSG_String = "المرجو المحاولة لاحقا. إذا إستمر الخطأ ، يرجى الاتصال بالمديرية العامة للضرائب.",

        this.error1_String = "خطأ: تم رفض الطلب",
        this.error_1_MSG_String = "المرجو المحاولة لاحقا. إذا إستمر الخطأ ، يرجى الاتصال بالمديرية العامة للضرائب",
        this.error2_String ="إخبار",
        this.error_2_MSG_String = "الخدمة تحت الصيانة حاليا. المرجو المحاولة لاحقا.",
        this.error3_String ="إخبار",
        this.error_3_MSG_String = "يرجى التحقق من صحة المعلومات الخاصة بك."
        // var loadingIndicator = this.loadingController.create({content : "Traitement en cours..."});
    
}
else {

    this.translateService.get('ERREUR_500').subscribe((value) => {
        this.error500_String = value;
      });
      this.translateService.get('ERREUR_500_MSG').subscribe((value) => {
        this.error500_MSG_String = value;
      });
      this.translateService.get('ERREUR_1_MSG').subscribe((value) => {
        this.error_1_MSG_String = value;
      });
      this.translateService.get('ERREUR_1').subscribe((value) => {
        this.error1_String = value;
      });
      this.translateService.get('ERREUR_2_MSG').subscribe((value) => {
        this.error_2_MSG_String = value;
      });
      this.translateService.get('ERREUR_2').subscribe((value) => {
        this.error2_String = value;
      });
      this.translateService.get('ERREUR_3_MSG').subscribe((value) => {
        this.error_3_MSG_String = value;
      });
      this.translateService.get('ERREUR_3').subscribe((value) => {
        this.error3_String = value;
      });
}
        var loadingIndicator = this.loadingController.create({cssClass:'my-loading-class', spinner:'bubbles',
        showBackdrop:true,
        enableBackdropDismiss :true});
        loadingIndicator.onDidDismiss(data => {
            super.request(url,options).timeout(1200000);
            console.log("DISMISSED LOADING");
        });
        loadingIndicator.present();
        
        var request = super.request(url, options)
            .timeout(120000)
            .catch(error => {
                    // console.log('handleError'+error)
                    // loadingIndicator.dismiss();

                    // const prompt = self.alertCtrl.create({
                    //     title: 'Erreur',
                    //     message : 'Erreur lors de la tentative de communication avec le serveur !'
                    //    });
                    // prompt.present();
                    // return Observable.throw(error)

                    loadingIndicator.dismiss();

                    if (error.status === 0) {
                        
                            // const prompt = self.alertCtrl.create({
                            //     title: 'INFO ',
                            //     // message : 'Erreur lors de la tentative de communication avec le serveur !'
                            //     message:'élément déja existant , veuillez contacter la DGI.'
                            //    });
                            //    prompt.present();

                        return Observable.throw(new Error(error.status));
                    }

                    console.log(error);

                    if (error.status === 500) {
                       return Observable.throw(new Error(error.status));
                    }
                 
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 412) {
                        // const prompt = self.alertCtrl.create({
                        //     title: '<p style="color:red"> Erreur </p>',
                        //     message:'<span>Veuillez vérifier votre reférence.</span>'
                        //    });
                        //    prompt.present(); 
                        return Observable.throw(new Error(error.status));
                    }

                    // else if (error.status === 400) {

                    //     console.log("here we are 400");

                    //     const prompt = self.alertCtrl.create({
                    //         title: 'Erreur ',
                    //         // message : 'Erreur lors de la tentative de communication avec le serveur !'
                    //         message:'Transaction introuvable.'
                    //        });
                    //        prompt.present();
                        
                    //        let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                    //        console.log(contentError);
                    //     return Observable.throw(new Error(error.status));
                    // }
                    return Observable.throw(new Error(error.status + '||' + error._body));
                }
            )
            .share();
        
        request.subscribe(
            success => {

               
                
                let reponseBody = success.text();

                // console.log("Success status "+reponseBody);

                // console.log(reponseBody);
                // window.open(reponseBody.URL,'_System','Lo')
                loadingIndicator.dismiss();

                if (reponseBody.search('REJETEE') != -1 ) {
                    const prompt = self.alertCtrl.create({
                        title: this.error1_String,
                        // message : 'Erreur lors de la tentative de communication avec le serveur !'
                        message:this.error_1_MSG_String
                       });
                    prompt.present();
                    
                    let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                    return Observable.throw( contentError );
                }

                if (reponseBody.search('maintenance') != -1 ) {
                    const prompt = self.alertCtrl.create({
                        title: this.error2_String,
                        // message : 'Erreur lors de la tentative de communication avec le serveur !'
                        message: this.error_2_MSG_String
                       });
                    prompt.present();
                    
                    let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                    return Observable.throw( contentError );
                }

                if (reponseBody.search('Ressource introuvable') != -1 ) {
                    const prompt = self.alertCtrl.create({
                        title: this.error3_String,
                        // message : 'Erreur lors de la tentative de communication avec le serveur !'

                        message:this.error_3_MSG_String
                       });
                    prompt.present();
                    
                    let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                    return Observable.throw( contentError );
                }


                if (reponseBody.search('Erreur 500') != -1 ) {
                    const prompt = self.alertCtrl.create({
                        title: this.error500_String,
                        // message : 'Erreur lors de la tentative de communication avec le serveur !'
                        message: this.error500_MSG_String
                       });
                    prompt.present();
                    
                    let contentError = new Response( new ResponseOptions({ body: 'Requête rejetée', type: ResponseType.Error}))
                    return Observable.throw( contentError );
                }

                // Une erreur interne s'est produite. Veuillez réessayer ultérieurement.<br /> Si l'erreur persiste, merci de contacter la DGI.

            },
                error => {

                 console.log("error status bo "+error);

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
                        // const prompt = self.alertCtrl.create({
                        //     title: '<p style="color:red"> Erreur </p>',
                        //     // message : 'Erreur lors de la tentative de communication avec le serveur !'
                        //     message:'<span>Veuillez vérifier votre reférence.</span>'
                        //    });
                        //    prompt.present();
                        
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        
                        return Observable.throw(new Error(error.status));
                    }

                  

            
                    
                    
                }
            );

        return request;
    }

    // public handleError = (error: Response) => {
    //     /*if('loadingIndicator' in this.singletonService.map){
    //         this.singletonService.map.loadingIndicator.dismiss();
    //     }*/
    //     console.log('handleError')
    //     if(this.loadingIndicator) this.loadingIndicator.dismiss();

    //     const prompt = this.alertCtrl.create({
    //         title: 'Erreur',
    //         message : 'Erreur lors de la tentative de communication avec le serveur !'
    //        });
    //     prompt.dismiss();

    //     // Do messaging and error handling here
    //     return Observable.throw(error)
    // }
}