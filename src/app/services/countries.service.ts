import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';

export interface Countries {
  altSpellings: string[];
  area: number;
  capital: string[];
  capitalInfo: { latlng: number[] };
  car: { signs: string[]; side: string };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: { png: string; svg: string };
  continents: string[];
  currencies: Object | Object[];
  demonyms: Object | Object[];
  fifa: string;
  flag: string;
  flags: { png: string; svg: string };
  idd: { root: string; suffixes: string[] };
  independent: boolean;
  landlocked: boolean;
  languages: { cha: string; eng: string; spa: string };
  latlng: number[];
  maps: { googleMaps: string; openStreetMaps: string };
  name: { common: string; official: string; nativeName: Object | Object[] };
  population: 168783;
  postalCode: { format: string; regex: string };
  region: string;
  startOfWeek: string;
  status: string;
  subregion: string;
  timezones: string[];
  tld: string[];
  translations: Object | Object[];
  unMember: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private url = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(params?: string | string[]): Observable<Countries[]> {
    let httpParams: HttpParams;
    if (params && typeof params === 'string') {
      httpParams = new HttpParams().append('fields', params);
    }

    if (params && params instanceof Array) {
      let paramsValue: string = '';

      params.forEach((p) => {
        paramsValue = !paramsValue ? `${p},` : `${paramsValue}${p},`;
      });

      httpParams = new HttpParams().append('fields', paramsValue);
    }

    return this.http
      .get<Countries[]>(this.url, { params: httpParams! ? httpParams : null! })
      .pipe(
        map((countries) => {
          return countries;
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
  }
}
