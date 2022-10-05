import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReclamationPage } from './reclamation';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ReclamationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReclamationPage),
    TranslateModule.forChild()
  ],
})
export class ReclamationPageModule {}
