import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestitutionsPage } from './restitutions';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RestitutionsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestitutionsPage),
    TranslateModule.forChild()
  ],
})
export class RestitutionsPageModule {}
