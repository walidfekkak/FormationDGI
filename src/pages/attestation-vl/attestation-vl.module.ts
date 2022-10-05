import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AttestationVlPage } from './attestation-vl';

@NgModule({
  declarations: [
    AttestationVlPage,
  ],
  imports: [
    IonicPageModule.forChild(AttestationVlPage),
    TranslateModule.forChild()
  ],
})
export class AttestationVlPageModule {}
