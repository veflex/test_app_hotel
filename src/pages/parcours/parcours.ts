import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-parcours',
    templateUrl: 'parcours.html'
})
export class ParcoursPage {
    item: any;
    constructor(public navCtrl: NavController,
        public param: NavParams, private storage: Storage) {
        storage.get('items').then((val) => {
            console.log(val);
        });

    }


}
