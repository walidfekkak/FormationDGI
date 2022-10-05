import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation1Page } from './attestation1';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation1Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation1Page),
    TranslateModule.forChild()
  ],
})
export class Attestation1PageModule {}
