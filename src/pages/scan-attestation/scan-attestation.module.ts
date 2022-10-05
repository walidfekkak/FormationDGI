import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanAttestationPage } from './scan-attestation';

@NgModule({
  declarations: [
    ScanAttestationPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanAttestationPage),
    TranslateModule.forChild()
  ],
})
export class ScanAttestationPageModule {}
