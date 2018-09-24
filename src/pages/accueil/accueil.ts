import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FiltrePage } from '../filtre/filtre';




@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  constructor(public navCtrl: NavController) {

  }

  goToHome(): void {
    this.navCtrl.setRoot(FiltrePage);
  }

}
