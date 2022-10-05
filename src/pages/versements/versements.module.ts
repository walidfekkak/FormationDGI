import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VersementsPage } from './versements';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VersementsPage,
  ],
  imports: [
    IonicPageModule.forChild(VersementsPage),
    TranslateModule.forChild()
  ],
})
export class VersementsPageModule {}
