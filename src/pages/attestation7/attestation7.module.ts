import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation7Page } from './attestation7';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation7Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation7Page),
    TranslateModule.forChild()
  ],
})
export class Attestation1PageModule {}
