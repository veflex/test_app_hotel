import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FiltrePage } from './../pages/filtre/filtre';
import { ProfilPage } from './../pages/profil/profil';
import { ListPage } from './../pages/list/list';
import { AccueilPage } from './../pages/accueil/accueil';
import { StoryPage } from './../pages/hotel_story/story';
import { BarPage } from '../pages/hotel_bar/bar';
import { CabPage } from '../pages/hotel_cab/cab';
import { ServicePage } from '../pages/hotel_service/service';
import { SpaPage } from '../pages/hotel_spa/spa';
import { SportPage } from '../pages/hotel_sport/sport';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccueilPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profil', component: ProfilPage },
      { title: 'My Room', component: FiltrePage },
      { title: 'Autours de moi', component: ListPage },
      { title: 'Mes coups de coeur', component: ListPage },
      { title: 'Parcours', component: ListPage },

      //      { title: 'Autour de moi', component: AroundMePage },
      //      { title: 'Mes coups de coeur', component: MyCrushsPage },
      //      { title: 'Parcours', component: ParcoursPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
