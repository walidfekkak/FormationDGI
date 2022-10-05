import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifAttestationPage } from './verif-attestation';

@NgModule({
  declarations: [
    VerifAttestationPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifAttestationPage),
    TranslateModule.forChild()
  ],
})
export class VerifAttestationPageModule {}
