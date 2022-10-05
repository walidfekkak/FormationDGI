import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation8Page } from './attestation8';

@NgModule({
  declarations: [
    Attestation8Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation8Page),
    TranslateModule.forChild()
  ],
})
export class Attestation8PageModule {}
