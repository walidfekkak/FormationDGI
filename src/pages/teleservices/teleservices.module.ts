import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { TeleservicesPage } from './teleservices';

@NgModule({
  declarations: [
    TeleservicesPage,
  ],
  imports: [
    IonicPageModule.forChild(TeleservicesPage),
    TranslateModule.forChild()
  ],
})
export class TeleservicesPageModule {}
