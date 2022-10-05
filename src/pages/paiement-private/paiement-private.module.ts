import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaiementPrivatePage } from './paiement-private';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PaiementPrivatePage
  ],
  imports: [
    IonicPageModule.forChild(PaiementPrivatePage),
    TranslateModule.forChild()
  ],
})
export class PaiementPrivatePageModule {}
