import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AttestationCaePage } from './attestation-cae';

@NgModule({
  declarations: [
    AttestationCaePage,
  ],
  imports: [
    IonicPageModule.forChild(AttestationCaePage),
    TranslateModule.forChild()
  ],
})
export class AttestationCaePageModule {}
