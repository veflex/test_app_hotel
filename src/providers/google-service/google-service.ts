import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class GoogleServiceProvider {
  // ApiKey Google for every platform
  // OLD API KEY perso "AIzaSyDgdZsGYn-ML6HQGG0_Uu3nGy0ZcXr5M7s"; 
  private apiKey: any = "AIzaSyDCXP1mVZEdFlC5apN8JbSSM44JUF2Dolk"

  constructor(public http: HttpClient) {

    console.log('Hello GoogleServiceProvider Provider');
  }

  // Google Script Methods 
  // --------------------------------------------------
  // Pas terrible a revoir pour implementer avec un plugin cordova ionic le script js pas terrible
  // Possible erreur de rajouter plusieur fois le script dans le dom
  checkScriptExist(callbackName:string){
    // create script element
    let script = document.createElement("script"); 
    script.id = "googleMaps";
    script.setAttribute('async','');
    script.setAttribute('defer','');
    // Check if apiKey exist always true
    this.apiKey ? script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback='+callbackName : script.src = 'http://maps.google.com/maps/api/js?&callback='+callbackName;       
    document.body.appendChild(script);
  }

  // Map show Methods 
  // --------------------------------------------------
  // A paramattrer avec un check connexion pour afficher ou non le block Connexion ou non --- !!!
  // Map Google out of connection
  disableMap(pleaseConnect){
    if(pleaseConnect){
      pleaseConnect.nativeElement.style.display = "block";
      console.log("disable map");
    }
  }

  // Map Google Ok
  enableMap(pleaseConnect){
    if(pleaseConnect){
      pleaseConnect.nativeElement.style.display = "none";
      console.log("enable map");
    }
  }
}