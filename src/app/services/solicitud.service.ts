import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Listar todos los registros
   * @param pagina
   * @param fecha_inicio
   * @param fecha_fin
   * @param status
   * @param company
   * @param cedula
   * @param cedula_jefe
   * @returns
   */
  list(pagina: number, fecha_inicio: string, fecha_fin: string, status: string, company: string, cedula: string, cedula_jefe: string) {
    let url = this.apiUrl + "api/solicitudes?page=" + pagina + '&inicio=' + fecha_inicio + '&fin=' + fecha_fin + '&status=' + status + '&company=' + company + '&empleado=' + cedula + '&jefe=' + cedula_jefe;
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
   * Exportar a excel
   * @param fecha_inicio
   * @param fecha_fin
   * @param status
   * @param company
   * @param cedula
   * @param cedula_jefe
   * @returns
   */
  exportar(fecha_inicio: string, fecha_fin: string, status: string, company: string, cedula: string, cedula_jefe: string) {
    let url = this.apiUrl + "api/solicitudes/excel?inicio=" + fecha_inicio + '&fin=' + fecha_fin + '&status=' + status + '&company=' + company + '&empleado=' + cedula + '&jefe=' + cedula_jefe;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers, responseType: "blob" });
  }

  /**
   * Exportar consolidado a excel
   * @param fecha_inicio
   * @param fecha_fin
   * @returns
   */
  exportarConsolidado(fecha_inicio: string, fecha_fin: string) {
    let url = this.apiUrl + "api/solicitudes/excel/consolidado?inicio=" + fecha_inicio + '&fin=' + fecha_fin;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers, responseType: "blob" });
  }

  /**
    * Reenviar todas solicitudes de aprobación
    * @returns
    */
  reenviarAll() {
    let url = this.apiUrl + "api/solicitudes/emails";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Reenviar solicitud de aprobación
   * @param id
   * @returns
   */
  reenviar(id: number) {
    let url = this.apiUrl + "api/solicitudes/emails?id=" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Anular solicitud
   * @param id
   * @returns
   */
  rechazar(id: number) {
    let url = this.apiUrl + "api/solicitudes/" + id + "/rechazar";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.put(url, "", { headers: headers });
  }

}
