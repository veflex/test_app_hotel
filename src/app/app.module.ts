import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//add for testing around me
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';



import { MyApp } from './app.component';
import { FiltrePage } from '../pages/filtre/filtre';
import { ProfilPage } from '../pages/profil/profil';
import { AccueilPage } from '../pages/accueil/accueil';
import { MyRoomPage } from '../pages/my_room/my_room';
import { ItemPage } from '../pages/item/item';
import { ParcoursPage } from '../pages/parcours/parcours';
import { AroundMeListPage } from '../pages/around_me/around-me-list';


import { IonPullupModule } from 'ionic-pullup';
import { IonicStorageModule } from '@ionic/storage';
import { IonicPage, NavController, NavParams, App, Platform, List, LoadingController, ToastController } from 'ionic-angular';


//providers
import { MuseumServiceProvider } from './../providers/museum-service/museum-service';
import { UtilsServiceProvider } from './../providers/utils-service/utils-service';
import { GoogleServiceProvider } from './../providers/google-service/google-service';





import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FiltrePage,
    ProfilPage,
    AccueilPage,
    MyRoomPage,
    ItemPage,
    ParcoursPage,
    AroundMeListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonPullupModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FiltrePage,
    ProfilPage,
    AccueilPage,
    MyRoomPage,
    ItemPage,
    ParcoursPage,
    AroundMeListPage
  ],
  providers: [
    StatusBar,
    MuseumServiceProvider,
    UtilsServiceProvider,
    GoogleServiceProvider,
    Diagnostic,
    Geolocation,


    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
