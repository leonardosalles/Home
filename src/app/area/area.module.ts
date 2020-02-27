import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AreaPage } from './area.page';
import { RemoteControlPage } from '../remote-control/remote-control.page';
import { LedControlPage } from '../led-control/led-control.page';
import { SendTextComponent } from '../send-text/send-text.component';

const routes: Routes = [
  {
    path: '',
    component: AreaPage
  }
];

@NgModule({
  entryComponents: [
    RemoteControlPage,
    LedControlPage,
    SendTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AreaPage, RemoteControlPage, LedControlPage, SendTextComponent]
})
export class AreaPageModule {}
