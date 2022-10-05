import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisImpositionPage } from './avis-imposition';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AvisImpositionPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisImpositionPage),
    TranslateModule.forChild()
  ],
})
export class AvisImpositionPageModule {}
