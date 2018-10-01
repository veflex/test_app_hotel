import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-my_room',
  templateUrl: 'my_room.html'
})
export class MyRoomPage {
  item: any;
  constructor(public navCtrl: NavController,
    public param: NavParams) {
    //get items pushed with the page
    this.item = this.param.get("all");

  }


}
