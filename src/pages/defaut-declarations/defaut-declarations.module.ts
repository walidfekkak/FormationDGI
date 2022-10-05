import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefautDeclarationsPage } from './defaut-declarations';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DefautDeclarationsPage,
  ],
  imports: [
    IonicPageModule.forChild(DefautDeclarationsPage),
    TranslateModule.forChild()
  ],
})
export class DefautDeclarationsPageModule {}
