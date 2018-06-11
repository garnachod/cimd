import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface AutocompletePlace {
  description: string;
  place_id: string;
}

export interface PlaceInfo {
  street: string;
  locality: string;
  postal_code: string;
  country: string;
}

@Injectable()
export class PlaceService {

  constructor(private http: HttpClient) { }

  getAutocompletePlaces(input: string): Observable<AutocompletePlace[]> {
    const href = '/api/v0/place/autocomplete/';

    const requestUrl = `${href}?input=${input}`;
    return this.http.get<AutocompletePlace[]>(requestUrl);
  }

  getPlaceInfo(place_id: string): Observable<PlaceInfo> {
    const href = '/api/v0/place/info/';

    const requestUrl = `${href}${place_id}/`;
    return this.http.get<PlaceInfo>(requestUrl);
  }

}
