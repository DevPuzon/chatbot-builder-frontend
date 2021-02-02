import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GuestMainPageRoutingModule } from './guest-main-routing.module';
import { GuestMainPage } from './guest-main.page';
import { ListContentTemplateComponent } from 'src/app/TemplatePackage/ListTemplate/list-content/list-content-template.component';
import { ChooseTemplateComponent } from '../choose-template/choose-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestMainPageRoutingModule
  ],
  declarations: [GuestMainPage,ListContentTemplateComponent,ChooseTemplateComponent]
})
export class GuestMainPageModule {}
