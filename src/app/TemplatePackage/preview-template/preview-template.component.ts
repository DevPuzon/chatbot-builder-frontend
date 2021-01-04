import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.scss'],
})
export class PreviewTemplateComponent implements OnInit {

  constructor(
    private mdlCtrl:ModalController
  ) { }

  ngOnInit() {}
 
  onPreviewMe(){
    //https://m.me/107790447304615
    window.open('https://m.me/102223365016973', '_blank')
  }
  onDismiss(){
    this.mdlCtrl.dismiss();
  }
}
