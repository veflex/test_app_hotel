import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Platform, List, LoadingController, ToastController } from 'ionic-angular';
// import { GettingTherePage } from '../getting-there/getting-there';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';


import { MuseumServiceProvider } from '../../providers/museum-service/museum-service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { GoogleServiceProvider } from '../../providers/google-service/google-service';

declare var google;

@Component({
  selector: 'page-around-me-list',
  templateUrl: 'around-me-list.html',
})
export class AroundMeListPage {
  @ViewChild(List) list: List;

  // User Var
  user_location: boolean = false;
  user_Lat_Coord: any
  user_Long_Coord: any;
  user_Km_Distance: number = 20000;
  // Museum Var
  list_of_AllMuseum: any;
  list_Of_Museum: Array<{
    _id_Records: string,
    _id_Museum: string,
    name: string,
    adresse: string,
    tel: string,
    lat: number,
    long: number,
    distance: string,
    close: string,
    open: string,
    opennight: string,
    region: string,
    departement: string,
    cp: string,
    city: string,
    website: string,
    tag: string
  }>;
  // Monument Var
  list_of_AllMonument: any;
  list_Of_Monument: Array<{
    _id_Records: string,
    _id_Ref: string,
    name: string,
    lat: number,
    long: number,
    distance: string,
    region: string,
    departement: string,
    cp: string,
    city: string,
    siecle: string,
    tag: string

  }>;
  // Constructor
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public app: App,
    public platform: Platform,
    public utilsService: UtilsServiceProvider,
    public loadingCtrl: LoadingController,
    public museumService: MuseumServiceProvider,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private googleService: GoogleServiceProvider) {

    this.userSetLocationTrue();

  }

  // Ionics Methods 
  // --------------------------------------------------
  // When enter on page
  ionViewWillEnter() {
    console.log('ionViewWillEnter ListabPage');
  }
  // When page is load
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListabPage');
  }

  // Localisation Methods 
  // --------------------------------------------------
  // Verifie si la localisation est disponible sur les platforms ios window et android
  // Reste a paramettrer les erroCallback et renvoyer sur page application activer geolocation  --- !!!!
  userSetLocationTrue() {
    if (this.platform.is("cordova")) {
      let successCallback = (isAvailable) => {
        this.user_location = isAvailable;
        this.userGetCurrentLocation();
      };
      let errorCallback = (e) => console.error(e);
      this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
    } else {
      this.userGetCurrentLocation();
    }
  }

  // Wath Current location de l'user (NOT USE) 
  // Voir si utile ou pas
  UserWathCurrentLocation() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    });
  }

  // Recupere la position de l'User
  // Parammettrer les translate services ultérieement pour les loading  --- !!!!
  userGetCurrentLocation() {
    // Implétenter ultérieuement les Loading en services --- !!!!
    let loadingPosition, loadingDataMuseum;
    loadingPosition = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Récupération de votre position...',
      enableBackdropDismiss: true
    });
    loadingDataMuseum = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Chargement des Musées...',
      enableBackdropDismiss: true
    });
    loadingPosition.present();
    // Check la position et renvoie un code d'erreur dans catch
    this.geolocation.getCurrentPosition().then((resp) => {
      if (resp) {
        this.user_Lat_Coord = resp.coords.latitude;
        this.user_Long_Coord = resp.coords.longitude;
        // Function async to check if script Google exist (reecrire ultériement le code avec un autre service)  --- !!!!
        this.checkScriptAndGeocode();
        loadingPosition.dismiss();
        loadingDataMuseum.present();
        // Récupère toutes les localisation des musée, actuellement en promesse réécrire en async ultérieuement  --- !!!!
        this.userMuseumLocation(resp.coords.latitude, resp.coords.longitude).then(response => {
          if (response)
            localStorage.setItem("ListOfMuseum", JSON.stringify(response));
          loadingDataMuseum.dismiss();
        });
        // Récupère toutes les localisation des monument, actuellement en promesse réécrire en async ultérieuement  --- !!!!
        this.userMonumentLocation(resp.coords.latitude, resp.coords.longitude).then(response => {
          if (response)
            localStorage.setItem("ListOfMonument", JSON.stringify(response));
        });
      } else {
        loadingPosition.dismiss();
      }
    }).catch((error) => {
      loadingPosition.dismiss();
      let toastError = this.toastCtrl.create({
        message: error + ` Veuillez activer votre Geolocalisation sur votre profil, ou sur votre téléphone`,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Fermer'
      })
      toastError.present();
    });
  }

  // Google Script Methods 
  // --------------------------------------------------
  // Save les lat et long de l'user en local
  parseGeocodeAdress() {
    localStorage.setItem("user_Lat", this.user_Lat_Coord);
    localStorage.setItem("user_Long", this.user_Long_Coord);
  }

  // Check Service Google
  // reecrire ultériement le code avec un autre service  --- !!!!
  async checkScriptAndGeocode() {
    try {
      // verifie si google est init ou pas
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        window['geocode'] = () => {
          this.parseGeocodeAdress();
        }
        await this.googleService.checkScriptExist("geocode");
      } else {
        this.parseGeocodeAdress();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Service Museum  Methods 
  // --------------------------------------------------
  // Recupere la list des monuments et la parse;
  // Recoder l'appel a museum service pour catch les erreurs --- !!!
  async userMonumentLocation(lat, long) {
    return new Promise((resolve, reject) => {
      this.museumService.getAllMonumentDataGouv(lat, long, this.user_Km_Distance).subscribe(dataMonument => {
        // console.log(dataMonument);
        if (dataMonument["records"]) {
          this.list_Of_Monument = [];
          this.list_of_AllMonument = dataMonument["records"];
          for (var l = 0; l < this.list_of_AllMonument.length; l++) {
            // Recupere l'id du record;
            let _id_records = this.utilsService.getValueReference(this.list_of_AllMonument[l], "recordid");
            let _id_ref = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "ref");
            // Recupere nom du musee
            let name = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "tico");
            // Recupere les coordonnee
            let coord = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "coordonnees_insee");
            if (coord.length > 0) {
              var lat = coord[0];
              var long = coord[1];
            }
            // Recupere la distance
            let distance = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "dist");
            // Recupere la region
            let region = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "new_name")
            region = region.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }).join(' ');
            // Recupere le departement
            let departement = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "nom_dept");
            departement = departement.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }).join(' ');
            // Recupere le Code postale
            let cp = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "insee");
            // Recupere la ville
            let city = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "commune");
            city = city.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }
            ).join(' ');
            // Recupere le siecle
            let siecle = this.utilsService.getValueReference(this.list_of_AllMonument[l].fields, "scle");
            // Push one by one on List of Munment;
            this.list_Of_Monument.push({
              _id_Records: _id_records,
              _id_Ref: _id_ref,
              name: name,
              lat: lat,
              long: long,
              distance: distance,
              region: region,
              departement: departement,
              cp: cp,
              city: city,
              siecle: siecle,
              tag: "monu"
            })
          }
        }
        resolve(this.list_Of_Monument);
        console.log(this.list_Of_Monument);
      })
    });
  }

  // Recupere la list des Musee et la parse (data differentes impossible de faire une method pour parse coorectement toutes les données) --- !!!
  // Recoder l'appel a museum service pour catch les erreurs --- !!!
  async userMuseumLocation(lat, long) {
    return new Promise((resolve, reject) => {
      this.museumService.getAllMuseeDataGouv(lat, long, this.user_Km_Distance).subscribe(dataMuseum => {
        if (dataMuseum["records"]) {
          this.list_Of_Museum = [];
          this.list_of_AllMuseum = dataMuseum["records"];
          for (var l = 0; l < this.list_of_AllMuseum.length; l++) {
            // Recupere l'id du record;
            let _id_records = this.utilsService.getValueReference(this.list_of_AllMuseum[l], "recordid");
            let _id_Museum = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "ref_musee");
            // Recupere nom du musee
            let name = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "nom_du_musee");
            // Recupere l'adresse
            let adresse = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "adr");
            // Recupere le telephone et parse empty si il y a pas
            let tel = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "telephone1");
            // Recupere le coord 
            let coord = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "coordonnees_finales");
            if (coord.length > 0) {
              var lat = coord[0];
              var long = coord[1];
            }
            // Recupere la distance par rapport a l'user 
            let distance = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "dist");
            // recupere information de close
            let close = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "fermeture_annuelle");
            // recupere information open
            let open = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "periode_ouverture");
            // recupere information open night
            let opennight = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "jours_nocturnes");
            // recupere region
            let region = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "new_regions");
            region = region.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }).join(' ');
            // recupere departement
            let departement = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "nomdep");
            departement = departement.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }).join(' ');
            // recupere code postal
            let cp = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "cp");
            //recupere la ville
            let city = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "ville");
            city = city.toLowerCase().split(' ').map((s) => {
              var str;
              str = s.charAt(0).toUpperCase() + s.substring(1);
              str = str.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('-');
              str = str.split("'").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join("'");
              return str;
            }
            ).join(' ');
            // recupere le website
            let website = this.utilsService.getValueReference(this.list_of_AllMuseum[l].fields, "sitweb");
            // parse les infos dans list of Museum
            this.list_Of_Museum.push({
              _id_Records: _id_records,
              _id_Museum: _id_Museum,
              name: name,
              adresse: adresse,
              tel: tel,
              lat: lat,
              long: long,
              distance: distance,
              close: close,
              open: open,
              opennight: opennight,
              region: region,
              departement: departement,
              cp: cp,
              city: city,
              website: website,
              tag: "musee"
            })
          }
        }
        resolve(this.list_Of_Museum);
      })
    });
  }

  // Html Click Methods 
  // --------------------------------------------------
  // renvoie sur la page getting-there avec les informations lat long et name du muséem ou du monuments
  // visitMap(item) {
  //   let latitude = item.lat;
  //   let longitude = item.long;
  //   let itemNameParam = item.name;
  //   let nav = this.app.getRootNav();

  //   nav.push(GettingTherePage, {
  //     long: longitude,
  //     lat: latitude,
  //     itemNameParam: itemNameParam
  //   })
  // }
}
