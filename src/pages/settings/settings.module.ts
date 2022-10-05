import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
