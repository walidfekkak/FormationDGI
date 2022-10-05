import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation4Page } from './attestation4';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation4Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation4Page),
    TranslateModule.forChild()
  ],
})
export class Attestation4PageModule {}
