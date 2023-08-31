import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setAuthToken(token: string) {
    localStorage.setItem('AccessToken', token)
  }

  getAuthToken() {
    return localStorage.getItem('AccessToken')
  }
}
