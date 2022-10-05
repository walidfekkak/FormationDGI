import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfouserPage } from './infouser';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfouserPage,
  ],
  imports: [
    IonicPageModule.forChild(InfouserPage),
    TranslateModule.forChild()
  ],
})
export class InfouserPageModule {}
