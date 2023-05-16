import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Listar todos los registros
   * @param pagina
   * @param buscar
   * @returns
   */
   list(pagina: number, buscar: string = "") {

    let url = this.apiUrl + "api/users" + "?page=" + pagina;

    if (buscar != "") {
      url = this.apiUrl + "api/users" + "?page=" + pagina + "&buscar=" + buscar;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Nuevo registro
   * @param data
   * @returns
   */
   create(data: any) {
    let url = this.apiUrl + "api/users";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }

  /**
   * Actualizar registro
   * @param id
   * @param data
   * @returns
   */
   update(id: number, data: any) {
    let url = this.apiUrl + "api/users/"  + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.put(url, data, { headers: headers });
  }

   /**
   * Actualizar passwrod
   * @param id
   * @param data
   * @returns
   */
    updatePassword(id: number, data: any) {
      let url = this.apiUrl + "api/users/"  + id + "/password";
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
      return this.http.put(url, data, { headers: headers });
    }
}
