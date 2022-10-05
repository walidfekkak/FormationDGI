import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpInterceptor } from '../services/httpInterceptor';
import { Items } from '../mocks/providers/items';
import { Settings, User, Api  } from '../providers';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiNative } from '../providers/api-native/api-native';
import { HTTP } from '@ionic-native/http';
//import { Network } from '@ionic-native/netw
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

import { Network } from '@ionic-native/network';
import { AchatTimbrePage } from '../pages/achat-timbre/achat-timbre';
import { AdhesionPage } from '../pages/adhesion/adhesion';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RecaptchaModule } from 'ng-recaptcha';
import { MotdepassePage } from '../pages/motdepasse/motdepasse';

import { CalendarPopoverPage } from '../pages/calendar-popover/calendar-popover';
import { LangChooserPopoverPage } from '../pages/lang-chooser-popover/lang-chooser-popover';
import { YearChooserPopoverPage } from '../pages/year-chooser-popover/year-chooser-popover';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Device } from '@ionic-native/device/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { AdhesionAllPage } from '../pages/adhesion-all/adhesion-all';
import { AdhesionCpuPage } from '../pages/adhesion-cpu/adhesion-cpu';
//import { ScanAttestationPage } from '../pages/scan-attestation/scan-attestation';
import { ScanFormulairePage } from '../pages/scan-formulaire/scan-formulaire';
import { LaunchReview } from '@ionic-native/launch-review/ngx';
import { Market } from '@ionic-native/market/ngx';

import { DirectivesModule } from '../directives/directives.module';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Md5 } from 'ts-md5/dist/md5';
import { CalendarModule } from '../modules/calendar-component';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    AchatTimbrePage,
    AdhesionAllPage,
    AdhesionPage,
    MotdepassePage,
    CalendarPopoverPage,
    LangChooserPopoverPage,
    YearChooserPopoverPage,
    AdhesionCpuPage,
    //ScanAttestationPage,
    ScanFormulairePage,
    //LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, 
      {
          mode: 'ios'
      }),
    IonicStorageModule.forRoot(),
    DirectivesModule,
    CalendarModule
  ],
  exports: [
    RecaptchaModule
 ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AchatTimbrePage,
    AdhesionPage,
    MotdepassePage,
    CalendarPopoverPage,
    LangChooserPopoverPage,
    YearChooserPopoverPage,
    AdhesionAllPage,
    AdhesionCpuPage,
    //ScanAttestationPage,
    ScanFormulairePage,
    //LoginPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Device,
    LaunchReview,
    HttpClientModule,
    HTTP,
    Market,
    File,
    FileTransfer,
    FileTransferObject,
    FileOpener,
    Api,
    ApiNative,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    HttpInterceptor,
    BarcodeScanner,
    FingerprintAIO,
    Md5,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    //InAppBrowser
  ]
})
export class AppModule { }
