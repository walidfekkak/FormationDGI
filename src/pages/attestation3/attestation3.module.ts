import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation3Page } from './attestation3';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation3Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation3Page),
    TranslateModule.forChild()
  ],
})
export class Attestation2PageModule {}
