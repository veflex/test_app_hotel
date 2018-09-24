import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FiltrePage } from '../pages/filtre/filtre';
import { ProfilPage } from '../pages/profil/profil';
import { ListPage } from '../pages/list/list';
import { AccueilPage } from '../pages/accueil/accueil';
import { StoryPage } from '../pages/hotel_story/story';
import { BarPage } from '../pages/hotel_bar/bar';
import { CabPage } from '../pages/hotel_cab/cab';
import { ServicePage } from '../pages/hotel_service/service';
import { SpaPage } from '../pages/hotel_spa/spa';
import { SportPage } from '../pages/hotel_sport/sport';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FiltrePage,
    ProfilPage,
    ListPage,
    AccueilPage,
    StoryPage,
    BarPage,
    CabPage,
    ServicePage,
    SpaPage,
    SportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FiltrePage,
    ProfilPage,
    ListPage,
    AccueilPage,
    StoryPage,
    BarPage,
    CabPage,
    ServicePage,
    SpaPage,
    SportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
