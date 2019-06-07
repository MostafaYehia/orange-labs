import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "src/app/core/services/api.service";

@Injectable({
  providedIn: "root"
})
export class ContactsApiService {
  baseContactsUrl;
  headers = {};
  constructor(private http: HttpClient, private api: ApiService) {
    this.baseContactsUrl = this.api.urls.contacts;
    this.headers = {
      Authorization: `bearer ${this.api.token}`
    };
  }

  getContacts = (page, sortTybe) => {
    this.http.get(`${this.baseContactsUrl}`, {
      headers: this.headers,
      params: {
        page: page || 1,
        sortBy: sortTybe || "firstName"
      }
    });
  };

  getSingleContact = id => {
    this.http.get(`${this.baseContactsUrl}/${id}`, {
      headers: this.headers
    });
  };

  createContact = data => {
    this.http.post(`${this.baseContactsUrl}`, data, {
      headers: this.headers
    });
  };

  editContact = (id, updatedData) => {
    this.http.put(`${this.baseContactsUrl}/${id}`, updatedData, {
      headers: this.headers
    });
  };

  deleteContact = id => {
    this.http.delete(`${this.baseContactsUrl}/${id}`, {
      headers: this.headers
    });
  };
}
