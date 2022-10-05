import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YearChooserPopoverPage } from './year-chooser-popover';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    YearChooserPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(YearChooserPopoverPage),
    TranslateModule.forChild()

  ],
})
export class YearChooserPageModule {}
