import { Injectable } from "@angular/core";
import * as crypto from "crypto-js";
import * as SecureStorage from "secure-web-storage";
@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  secureStorage;
  SECRET_KEY = "odm12rft4tnu3tdn74tdkewfj8tf4tkn4f84bt57u34nu4ft";

  constructor() {
    this.secureStorage = new SecureStorage(localStorage, {
      hash: key => {
        key = crypto.SHA256(key, this.SECRET_KEY);

        return key.toString();
      },
      encrypt: data => {
        data = crypto.AES.encrypt(data, this.SECRET_KEY);

        data = data.toString();

        return data;
      },
      decrypt: data => {
        data = crypto.AES.decrypt(data, this.SECRET_KEY);

        data = data.toString(crypto.enc.Utf8);

        return data;
      }
    });
  }

  storeItem = (key, data) => this.secureStorage.setItem(key, data);
  getItem = key => this.secureStorage.getItem(key);
  removeItem = key => this.secureStorage.removeItem(key);
  clearStorage = key => this.secureStorage.clear();
  
}
