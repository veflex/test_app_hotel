import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-my_room',
  templateUrl: 'my_room.html'
})
export class MyRoomPage {

  constructor(public navCtrl: NavController) {
    this.pet = "my_room";
  }

}
