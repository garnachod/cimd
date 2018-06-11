import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface PaginateContacts {
  count: number;
  next: string;
  previous: string;
  results: Contact[];
}

export interface Contact {
    id: number;
    name: string;
    last_name: string;
    telephone: string;
    email: string;
    website: string;
    street: string;
    locality: string;
    postal_code: string;
    country: string;
}

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(search: string, page: number): Observable<PaginateContacts> {
    const href = '/api/v0/contacts/';

    const requestUrl = `${href}?search=${search}&page=${page + 1}`;
    return this.http.get<PaginateContacts>(requestUrl);
  }

  getContact(id: number): Observable<Contact> {
    const href = '/api/v0/contacts/';

    const requestUrl = `${href}${id}/`;
    return this.http.get<Contact>(requestUrl);
  }

  createContact(contact: Contact) {
    const href = '/api/v0/contacts/';

    const requestUrl = `${href}`;
    return this.http.post<Contact>(requestUrl, contact);
  }

  patchContact(contact: Contact) {
    const href = '/api/v0/contacts/';

    const requestUrl = `${href}${contact.id}/`;
    return this.http.patch<Contact>(requestUrl, contact);
  }
}
