import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPopoverPage } from './calendar-popover';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CalendarPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPopoverPage),
    TranslateModule.forChild()

  ],
})
export class AchatTimbrePageModule {}
