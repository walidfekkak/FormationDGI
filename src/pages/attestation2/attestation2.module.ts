import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation2Page } from './attestation2';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation2Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation2Page),
    TranslateModule.forChild()
  ],
})
export class Attestation2PageModule {}
