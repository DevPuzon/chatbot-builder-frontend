import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent implements OnInit {

  hasBack = true;
  constructor(private nav:NavController,
    private router:Router,
    private route:ActivatedRoute) {
    route.url.subscribe((url:any) =>{
      this.hasBack = !!router.url.includes('/terms-condition');  
    }); 
  }

  ngOnInit() {}

  onBack(){
    this.nav.back();
  }
}
