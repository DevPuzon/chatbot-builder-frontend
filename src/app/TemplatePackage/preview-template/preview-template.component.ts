import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.scss'],
})
export class PreviewTemplateComponent implements OnInit {

  template_data :any;
  constructor(
    private mdlCtrl:ModalController
  ) { }

  ngOnInit() {
    console.log(this.template_data);
  }
 
  onPreviewMe(){
    //https://m.me/107790447304615
    window.open(`https://m.me/${this.template_data.fb_page_id}`, '_blank')
  }
  onDismiss(){
    this.mdlCtrl.dismiss();
  }
}
