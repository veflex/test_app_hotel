import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-filtre',
  templateUrl: 'filtre.html'
})
export class FiltrePage {
  filtre: string = "my_room";
  constructor(public navCtrl: NavController) {
  }

}
