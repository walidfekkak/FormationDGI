import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentificationDataPage } from './identification-data';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    IdentificationDataPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentificationDataPage),
    TranslateModule.forChild()
  ],
})
export class IdentificationDataPageModule {}
