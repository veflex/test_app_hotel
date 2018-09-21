import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  constructor(public navCtrl: NavController) {

  }
    public showSign () {
        const log = document.getElementById("login");
        const sign = document.getElementById("sign_in");
        log.classList.add("is-hidden");
        sign.classList.remove("is-hidden");
    }
    
    public showLog () {
        const log = document.getElementById("login");
        const sign = document.getElementById("sign_in");
        log.classList.remove("is-hidden");
        sign.classList.add("is-hidden");
    }
}
