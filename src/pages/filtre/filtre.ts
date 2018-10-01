import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Slides } from 'ionic-angular';
import { IonicPage, NavParams, App, Platform, List, LoadingController, ToastController } from 'ionic-angular';

import { MyApp } from './.././../app/app.component';
import { Storage } from '@ionic/storage';



import { MyRoomPage } from "./../my_room/my_room";
import { ItemPage } from './../item/item';

//mport pour appel api around me 
import { MuseumServiceProvider } from '../../providers/museum-service/museum-service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { GoogleServiceProvider } from '../../providers/google-service/google-service';

declare var google;

@Component({
  selector: 'page-filtre',
  templateUrl: 'filtre.html'
})


export class FiltrePage {
  @ViewChild(List) list: List;
  // Filter
  filtre: any = "my_room";
  my_room: Array<{
    title: string,
    bandename: string,
    url_image: string,
    page: string,
    content: string,
    tag: string
  }>;
  all: Array<Object> = [];
  items: any;
  allitems: any;
  nameslistFilter: any;

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
  }>;

  constructor(
    public navCtrl: NavController,
    public event: Events,
    private storage: Storage,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public app: App,
    public platform: Platform,
    public utilsService: UtilsServiceProvider,
    public loadingCtrl: LoadingController,
    public museumService: MuseumServiceProvider,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private googleService: GoogleServiceProvider
  ) {

    this.userSetLocationTrue();
    ////////////TRY DE SWITCH MENU ET CASE
    const that = this;
    document.getElementById("around_me").addEventListener("click", function () {
      // that.navCtrl.setRoot(FiltrePage);
      that.filtre = "around_me"
      console.log(that.filtre);
      return;

    })





    this.my_room = [{ title: "Story", url_image: "img/1.jpg", bandename: "Histoire de l'hotel", page: "story", content: "tamere", tag: "musee" },
    { title: "Spa", url_image: "img/testportait.jpg", bandename: "Spa & piscine", page: "spa", content: "tamere", tag: "sortie" },
    { title: "Sport & loisirs", url_image: "img/3.jpg", bandename: "Sport & loisirs", page: "sport", content: "tamere", tag: "sortie" },
    { title: "Service", url_image: "img/4.png", bandename: "Room Service", page: "service", content: "tamere", tag: "musee" },
    { title: "Bar", url_image: "img/unsplsh.jpg", bandename: "Bar & Restaurant", page: "bar", content: "tamere", tag: "sortie" },
    { title: "Reservez un taxi", url_image: "img/6.png", bandename: "Reservez un taxi", page: "cab", content: "tamere", tag: "plan" }];

    // this.items = [{ title: "Story", url_image: "img/testportait.jpg", bandename: "Histoire de l'hotel", page: "story", content: "tamere", tag: "musee" },
    // { title: "Spa", url_image: "img/unsplsh.jpg", bandename: "Spa & piscine", page: "spa", content: "tamere", tag: "sortie" },
    // { title: "Sport & loisirs", url_image: "img/testportait.jpg", bandename: "Sport & loisirs", page: "sport", content: "tamere", tag: "sortie" },
    // { title: "Service", url_image: "img/unsplsh.jpg", bandename: "Room Service", page: "service", content: "tamere", tag: "musee" },
    // { title: "Bar", url_image: "img/unsplsh.jpg", bandename: "Bar & Restaurant", page: "bar", content: "tamere", tag: "sortie" },
    // { title: "Reservez un taxi", url_image: "img/testportait.jpg", bandename: "Reservez un taxi", page: "cab", content: "tamere", tag: "plan" }]



    // this.allitems = this.items;
    storage.set('items', this.allitems);
  }

  // push les page concernant my room avec l'objet en question
  public pushPageRoom(obj) {
    this.navCtrl.push(MyRoomPage, {
      all: obj
    });
  };

  // push les page concernant les mini-expo avec l'objet en question
  public pushPageItem(obj) {
    this.navCtrl.push(ItemPage, {
      all: obj
    });
  };

  //change le contenue par rapport au filtre
  changeContenu(valuefiltre: string) {

    this.items = [];
    if (valuefiltre == 'around') {
      this.items = this.all;
    } else if (valuefiltre == 'musee') {
      this.items = this.all.filter(function (item) {
        return item.tag === "musee"
      });
    } else if (valuefiltre == 'sortie') {
      this.items = this.all.filter(function (item) {
        return item.tag === "monument"
      });
    } else if (valuefiltre == 'plan') {
      this.items = this.allitems.filter(function (item) {
        return item.tag === "plan"
      });
    } else {
      this.items = this.allitems;
    }
    console.log(this.items);
    // this.filterFunction(this.nameslistFilter);
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

            //tag
            let tag = this.utilsService.getValueReference(this.list_of_AllMonument[l], "tag");


            // Push one by one on List of Munment;
            // this.list_Of_Monument.push({
            //   _id_Records: _id_records,
            //   _id_Ref: _id_ref,
            //   name: name,
            //   lat: lat,
            //   long: long,
            //   distance: distance,
            //   region: region,
            //   departement: departement,
            //   cp: cp,
            //   city: city,
            //   siecle: siecle,

            // });
            this.all.push({
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
              tag: tag,
            });


          }
        }
        resolve(this.list_Of_Monument);
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
          console.log("all_museum =========");
          console.log(this.list_of_AllMuseum);

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

            //recup tag 
            let tag = this.utilsService.getValueReference(this.list_of_AllMuseum[l], "tag");

            // parse les infos dans list of Museum
            // this.list_Of_Museum.push({
            //   _id_Records: _id_records,
            //   _id_Museum: _id_Museum,
            //   name: name,
            //   adresse: adresse,
            //   tel: tel,
            //   lat: lat,
            //   long: long,
            //   distance: distance,
            //   close: close,
            //   open: open,
            //   opennight: opennight,
            //   region: region,
            //   departement: departement,
            //   cp: cp,
            //   city: city,
            //   website: website
            // });
            this.all.push({
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
              tag: tag
            })
          }
        }
        resolve(this.list_Of_Museum);

        console.log("allllllll end ");
        console.log(this.all);

      })
    });
  }

}
