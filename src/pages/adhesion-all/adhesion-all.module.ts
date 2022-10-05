import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AdhesionAllPage } from './adhesion-all';

@NgModule({
  declarations: [
    AdhesionAllPage,
  ],
  imports: [
    IonicPageModule.forChild(AdhesionAllPage),
    TranslateModule.forChild()
  ],
})
export class AdhesionAllPageModule {}
