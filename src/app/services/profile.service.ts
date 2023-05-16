import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
  * Listar todas las compañias
  * @returns
  */
  list() {
    let url = this.apiUrl + "api/perfil";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

 /**
  * Actualizar nombre
  * @param data
  * @returns
  */
  perfil(data: any) {
    let url = this.apiUrl + "api/perfil";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }

  /**
  * Actualizar avatar
  * @param data
  * @returns
  */
   avatar(data: any) {
    let url = this.apiUrl + "api/perfil/avatar";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }

  /**
  * Actualizar password
  * @param data
  * @returns
  */
   password(data: any) {
    let url = this.apiUrl + "api/perfil/password";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }
}
