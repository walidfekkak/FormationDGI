import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PaiementPage } from './paiement';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    PaiementPage,
  ],
  imports: [
    RecaptchaModule,
    IonicPageModule.forChild(PaiementPage),
    TranslateModule.forChild()
  ],
})
export class PaiementPageModule {}
