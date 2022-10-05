import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation6Page } from './attestation6';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation6Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation6Page),
    TranslateModule.forChild()
  ],
})
export class Attestation6PageModule {}
