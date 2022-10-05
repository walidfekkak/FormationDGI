import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeleServicesPrivatePage } from './tele-services-private';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TeleServicesPrivatePage,
  ],
  imports: [
    IonicPageModule.forChild(TeleServicesPrivatePage),
    TranslateModule.forChild()
  ],
})
export class TeleServicesPrivatePageModule {}
