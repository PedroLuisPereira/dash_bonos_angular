import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineService {

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

    let url = this.apiUrl + "api/lines" + "?page=" + pagina;

    if (buscar != "") {
      url = this.apiUrl + "api/lines" + "?page=" + pagina + "&buscar=" + buscar;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Listar todas las compañias
   * @returns
   */
  getCompanies() {
    let url = this.apiUrl + "api/companies/list/all";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Nuevo registro
   * @param companyId
   * @param line
   * @returns
   */
  create(companyId: number, line: any) {
    let url = this.apiUrl + "api/companies/" + companyId + "/lines";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, line, { headers: headers });
  }

  /**
   * Actualizar registro
   * @param companyId
   * @param id
   * @param line
   * @returns
   */
  update(companyId: number, id: number, line: any) {
    let url = this.apiUrl + "api/companies/" + companyId + "/lines/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.put(url, line, { headers: headers });
  }

}
