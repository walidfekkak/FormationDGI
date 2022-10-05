import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AdhesionPage } from './adhesion';

@NgModule({
  declarations: [
    AdhesionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdhesionPage),
    TranslateModule.forChild()
  ],
})
export class AdhesionPageModule {}
