import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { Attestation9Page } from './attestation9';

@NgModule({
  declarations: [
    Attestation9Page,
  ],
  imports: [
    IonicPageModule.forChild(Attestation9Page)
    ,
    TranslateModule.forChild()
  ],
})
export class Attestation9PageModule {}
