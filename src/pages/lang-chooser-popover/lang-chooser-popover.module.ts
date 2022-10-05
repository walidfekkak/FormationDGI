import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LangChooserPopoverPage } from './lang-chooser-popover';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LangChooserPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(LangChooserPopoverPage),
    TranslateModule.forChild()

  ],
})
export class AchatTimbrePageModule {}
