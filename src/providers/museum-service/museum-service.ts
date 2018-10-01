import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MuseumServiceProvider {


  // Url of Data Gouv with list of dataset to get
  private musee_DataGouv_Db_Url: string = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france"
  private monument_DataGouv_Db_Url: string = "https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-des-immeubles-proteges-au-titre-des-monuments-historiques";

  // Constructor
  constructor(public http: HttpClient) {

    console.log('Hello MuseumServiceProvider Provider');

  }

  // Errors Methods 
  // --------------------------------------------------
  // TODO : Implement a service for handleError with translate and add a send Email with code error  --- !!! 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error("Error = ", error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // Service DataGouv Methods 
  // --------------------------------------------------
  // Method Get Monument
  getAllMonumentDataGouv(lat: number, long: number, km: number): Observable<any> {
    return this.http.get<any>(this.monument_DataGouv_Db_Url + '&geofilter.distance=' + lat + ',' + long + ',' + km + '&rows=20')
      .pipe(
        // .tap method not really usefull perpars not Observable and subscribe only good, think it --- !!!
        tap(monuments_DataGouv => {
          monuments_DataGouv.records.forEach(function (monu) {
            monu.tag = "monument";
          })
          console.log(monuments_DataGouv.records);

        }),
        catchError(this.handleError("Chargement des données", []))
      );
  }

  // Method Get Muséum
  getAllMuseeDataGouv(lat: number, long: number, km: number): Observable<any> {
    return this.http.get<any>(this.musee_DataGouv_Db_Url + '&geofilter.distance=' + lat + ',' + long + ',' + km + '&rows=20')
      .pipe(
        // .tap method not really usefull perpars not Observable and subscribe only good, think it --- !!!
        tap(musee_DataGouv => {
          musee_DataGouv.records.forEach(function (musee) {
            musee.tag = "musee";
          });
          console.log(musee_DataGouv.records);

        }),
        catchError(this.handleError("Chargement des données", []))
      );
  }
}
