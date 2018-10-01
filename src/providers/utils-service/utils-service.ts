import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilsServiceProvider {

  constructor(
    public toastCtrl: ToastController) {

    console.log('Hello UtilsServiceProvider Provider');

  }

  // Toast Methods Global
  // --------------------------------------------------
  // Affiche un toast,a paramattrer dans l'ensemble des pages --- !!!
  presentToast(msg: string, duration?: number, position?: string, cssClass?: string, showCloseButton?: boolean, closeButtonText?: string, dismissOnPageChange?: boolean) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      cssClass: cssClass,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText,
      dismissOnPageChange: dismissOnPageChange
    });
    toast.present();
  }

  // Utils Methods Global
  // --------------------------------------------------
  // Permet de recuperer la valeur d'une clef JSON, si elle existe et renvoie un string vide si existe pas
  getValueReference(object, key) {
    function search(o) {
      if (!o || typeof o !== 'object') {
        return;
      }
      if (key in o) {
        reference = o[key];
        return true;
      }
      Object.keys(o).some((k) => {
        return search(o[k]);
      });
    }
    var reference;
    search(object);
    return reference ? reference : "";
  }
}
