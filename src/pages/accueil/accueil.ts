import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MyRoomPage } from './../my_room/my_room';




@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  constructor(public navCtrl: NavController) {
      
  }
    
    goToHome(): void {
  this.navCtrl.setRoot(MyRoomPage);
}

}
