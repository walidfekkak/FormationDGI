import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { AdhesionCpuPage } from './adhesion-cpu';

@NgModule({
  declarations: [
    AdhesionCpuPage,
  ],
  imports: [
    IonicPageModule.forChild(AdhesionCpuPage),
    TranslateModule.forChild()
  ],
})
export class AdhesionCpuPageModule {}
