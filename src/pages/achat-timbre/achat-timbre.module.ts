import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchatTimbrePage } from './achat-timbre';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AchatTimbrePage,
  ],
  imports: [
    IonicPageModule.forChild(AchatTimbrePage),
    TranslateModule.forChild()

  ],
})
export class AchatTimbrePageModule {}
