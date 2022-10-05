import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanFormulairePage } from './scan-formulaire';

@NgModule({
  declarations: [
    ScanFormulairePage,
  ],
  imports: [
    IonicPageModule.forChild(ScanFormulairePage),
  ],
})
export class ScanFormulairePageModule {}
