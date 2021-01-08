import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {

  hasBack = true;
  constructor(private nav:NavController,
    private router:Router,
    private route:ActivatedRoute) {
    route.url.subscribe((url:any) =>{
      this.hasBack = !!router.url.includes('privacy-policy');  
    }); 
  }

  ngOnInit() {}

  onBack(){
    this.nav.back();
  }
}
