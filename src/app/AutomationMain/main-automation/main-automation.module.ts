import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAutomationPageRoutingModule } from './main-automation-routing.module';

import { MainAutomationPage } from './main-automation.page';
import { AutomationComponent } from '../automation/automation.component';
import { AddQuickreplyComponent } from '../add-quickreply/add-quickreply.component';
import { AddCarButtonComponent } from '../add-car-button/add-car-button.component';
import { AddTextButtonPopupComponent } from '../add-text-button-popup/add-text-button-popup.component';
import { WordMatchingContentComponent } from '../WordMatching/word-matching-content/word-matching-content.component';
import { WmPropertiesComponent } from '../WordMatching/wm-properties/wm-properties.component';
import { AddCbackResponseComponent } from '../add-cback-response/add-cback-response.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EditStopChatlLiveComponent } from '../edit-stop-chatl-live/edit-stop-chatl-live.component'; 
import { ExportasfileComponent } from '../exportasfile/exportasfile.component';
import { MenuAutomateComponent } from '../menu-automate/menu-automate.component';

@NgModule({ 
  imports: [
    CommonModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MainAutomationPageRoutingModule
  ],
  declarations: [MainAutomationPage,AutomationComponent,
    AddCarButtonComponent,AddQuickreplyComponent,
    AddTextButtonPopupComponent,AddCbackResponseComponent,
    EditStopChatlLiveComponent,MenuAutomateComponent,
    ExportasfileComponent,
    WordMatchingContentComponent,WmPropertiesComponent]
})
export class MainAutomationPageModule {}
