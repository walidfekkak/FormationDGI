import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResteAPayerPage } from './reste-a-payer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResteAPayerPage,
  ],
  imports: [
    IonicPageModule.forChild(ResteAPayerPage),
    TranslateModule.forChild()
  ],
})
export class ResteAPayerPageModule {}
