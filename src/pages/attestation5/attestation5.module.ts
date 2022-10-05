import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation5Page } from './attestation5';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Attestation5Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation5Page),
    TranslateModule.forChild()
  ],
})
export class Attestation5PageModule {}
