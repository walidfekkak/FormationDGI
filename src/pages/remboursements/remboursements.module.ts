import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemboursementsPage } from './remboursements';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RemboursementsPage,
  ],
  imports: [
    IonicPageModule.forChild(RemboursementsPage),
    TranslateModule.forChild()
  ],
})
export class RemboursementsPageModule {}
