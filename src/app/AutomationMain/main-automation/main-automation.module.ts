import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAutomationPageRoutingModule } from './main-automation-routing.module';

import { MainAutomationPage } from './main-automation.page';
import { AutomationComponent } from '../automation/automation.component';
import { AddQuickreplyComponent } from '../add-quickreply/add-quickreply.component';
import { AddCarButtonComponent } from '../add-car-button/add-car-button.component';
import { AddTextButtonPopupComponent } from '../add-text-button-popup/add-text-button-popup.component';
import { WordMatchingContentComponent } from '../WordMatching/word-matching-content/word-matching-content.component';
import { WmPropertiesComponent } from '../WordMatching/wm-properties/wm-properties.component';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAutomationPageRoutingModule
  ],
  declarations: [MainAutomationPage,AutomationComponent,
    AddCarButtonComponent,AddQuickreplyComponent,
    AddTextButtonPopupComponent,
    WordMatchingContentComponent,WmPropertiesComponent]
})
export class MainAutomationPageModule {}