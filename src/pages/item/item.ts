import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IonPullUpFooterState } from 'ionic-pullup';


@Component({
    selector: 'page-item',
    templateUrl: 'item.html'
})
export class ItemPage {
    item: any;
    footerState: IonPullUpFooterState;
    constructor(public navCtrl: NavController, public param: NavParams) {
        this.item = this.param.get("all");
    }
    footerCollapsed() {

        console.log('Footer collapsed!');
    }
    footerExpanded() {
        console.log('Footer expanded!');
    }

    toggleFooter() {
        this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }
}
