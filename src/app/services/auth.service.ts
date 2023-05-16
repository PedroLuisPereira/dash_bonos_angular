import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  apiUrl: string;

  private auth: boolean = false;
  private isAdmin: boolean = false;


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Hacer login
   * @param data
   * @returns
   */
  login(data: any) {
    return this.http.post(this.apiUrl + 'api/auth/login', data);
  }

  /**
   * Consultar usuario autenticado
   * @returns
   */
  getUser() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(this.apiUrl + 'api/user', { headers: headers });
  }

  setAuth(auth: boolean): void {
    this.auth = auth;
  }

  getAuth(): boolean {
    return this.auth;
  }

  setIsAdmin(data: boolean): void {
    this.isAdmin = data;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }
}
