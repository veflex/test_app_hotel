import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MyApp } from './.././../app/app.component';

import { MyRoomPage } from "./../my_room/my_room"



@Component({
  selector: 'page-filtre',
  templateUrl: 'filtre.html'
})


export class FiltrePage {
  filtre: any = "my_room";

  eventCatch: any;
  items: Array<{
    title: string,
    bandename: string,
    url_image: string,
    page: string,
    content: string
  }>;
  constructor(public navCtrl: NavController,
    public event: Events) {
    ////////////TRY DE SWITCH MENU ET CASE
    const that = this;

    console.log(document.getElementById("profil"));
    document.getElementById("around_me").addEventListener("click", function () {

      // that.navCtrl.setRoot(FiltrePage);
      that.filtre = "around_me"
      console.log(that.filtre);
      return;

    })





    this.items = [{ title: "Story", url_image: "img/1.jpg", bandename: "Histoire de l'hotel", page: "story", content: "tamere" },
    { title: "Spa", url_image: "img/2.jpg", bandename: "Spa & piscine", page: "spa", content: "tamere" },
    { title: "Sport & loisirs", url_image: "img/3.jpg", bandename: "Sport & loisirs", page: "sport", content: "tamere" },
    { title: "Service", url_image: "img/4.png", bandename: "Room Service", page: "service", content: "tamere" },
    { title: "Bar", url_image: "img/5.jpg", bandename: "Bar & Restaurant", page: "bar", content: "tamere" },
    { title: "Reservez un taxi", url_image: "img/6.png", bandename: "Reservez un taxi", page: "cab", content: "tamere" }]
  }

  public pushPage(obj) {

    this.navCtrl.push(MyRoomPage, {
      all: obj
    });


  }

}
