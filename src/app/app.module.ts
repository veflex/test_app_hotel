import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { FiltrePage } from '../pages/filtre/filtre';
import { ProfilPage } from '../pages/profil/profil';
import { ListPage } from '../pages/list/list';
import { AccueilPage } from '../pages/accueil/accueil';
import { MyRoomPage } from '../pages/my_room/my_room';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FiltrePage,
    ProfilPage,
    ListPage,
    AccueilPage,
    MyRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FiltrePage,
    ProfilPage,
    ListPage,
    AccueilPage,
    MyRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
