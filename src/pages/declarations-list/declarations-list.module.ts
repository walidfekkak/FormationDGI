import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclarationsListPage } from './declarations-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DeclarationsListPage,
  ],
  imports: [
    IonicPageModule.forChild(DeclarationsListPage),
    TranslateModule.forChild()
  ],
})
export class DeclarationsListPageModule {}
