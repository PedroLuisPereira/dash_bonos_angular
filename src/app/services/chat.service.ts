import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Listar un registro
   * @param id
   * @returns
   */
   listByid(id: number) {
    let url = this.apiUrl + "api/employees/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
 * Listar todos los registros
 * @param pagina
 * @param buscar
 * @returns
 */
  list(id: number) {
    let url = this.apiUrl + "api/chats/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Crear nuevo registro
   * @param company
   * @returns
   */
   create(data: any) {
    let url = this.apiUrl + "api/chats";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }
}
