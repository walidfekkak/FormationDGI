import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    TranslateModule.forChild()
  ],
})
export class DetailPageModule {}
