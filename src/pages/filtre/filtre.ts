import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyApp } from './.././../app/app.component';

import { StoryPage } from "./../hotel_story/story"
import { BarPage } from './../hotel_bar/bar';
import { CabPage } from './../hotel_cab/cab';
import { ServicePage } from './../hotel_service/service';
import { SpaPage } from './../hotel_spa/spa';
import { SportPage } from './../hotel_sport/sport';


@Component({
  selector: 'page-filtre',
  templateUrl: 'filtre.html'
})
export class FiltrePage {
  filtre: string = "my_room";
  items: Array<{
    title: string,
    bandename: string,
    url_image: string,
    page: string
  }>;
  constructor(public navCtrl: NavController) {
    this.items = [{ title: "Story", url_image: "img/1.jpg", bandename: "Histoire de l'hotel", page: "story" },
    { title: "Spa", url_image: "img/2.jpg", bandename: "Spa & piscine", page: "spa" },
    { title: "Sport & loisirs", url_image: "img/3.jpg", bandename: "Sport & loisirs", page: "sport" },
    { title: "Service", url_image: "img/4.png", bandename: "Room Service", page: "service" },
    { title: "Bar", url_image: "img/5.jpg", bandename: "Bar & Restaurant", page: "bar" },
    { title: "Reservez un taxi", url_image: "img/6.png", bandename: "Reservez un taxi", page: "cab" }]
  }

  public pushPage(page) {
    if (page === "story") {
      this.navCtrl.push(StoryPage);
    } else if (page === "spa") {
      this.navCtrl.push(SpaPage);
    } else if (page === "sport") {
      this.navCtrl.push(SportPage);
    } else if (page === "service") {
      this.navCtrl.push(ServicePage);
    } else if (page === "bar") {
      this.navCtrl.push(BarPage);
    } else if (page === "cab") {
      this.navCtrl.push(CabPage);
    }

  }

}
