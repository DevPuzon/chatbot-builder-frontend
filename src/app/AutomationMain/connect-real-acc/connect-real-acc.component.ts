import { Component, OnInit } from '@angular/core'; 
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-connect-real-acc',
  templateUrl: './connect-real-acc.component.html',
  styleUrls: ['./connect-real-acc.component.scss'],
})
export class ConnectRealAccComponent implements OnInit {
  isConnectAcc = true;
  constructor( 
    private modalCtrl:ModalController
    ) { }
  ngOnInit(): void { 
  }
 
  onBack(){ 
    this.modalCtrl.dismiss();
  }
  
  isLogin =true;
  onPathLogin(){
    this.isLogin = !this.isLogin;  
  }
}
