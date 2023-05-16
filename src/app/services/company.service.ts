import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

    let url = this.apiUrl + "api/companies" + "?page=" + pagina;

    if (buscar != "") {
      url = this.apiUrl + "api/companies" + "?page=" + pagina + "&buscar=" + buscar;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Crear nuevo registro
   * @param company
   * @returns
   */
  create(company: any) {
    let url = this.apiUrl + "api/companies";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, company, { headers: headers });
  }

 /**
  * Actualiar un registro
  * @param company
  * @param id
  * @returns
  */
  update(id: number, company: any) {
    let url = this.apiUrl + "api/companies/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.put(url, company, { headers: headers });
  }
}
