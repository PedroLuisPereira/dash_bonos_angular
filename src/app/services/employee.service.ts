import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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
    let url = this.apiUrl + "api/employees" + "?page=" + pagina;

    if (buscar != "") {
      url = this.apiUrl + "api/employees" + "?page=" + pagina + "&buscar=" + buscar;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
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
   * Listar registro por nombre
   * @param nombre
   * @returns
   */
   listByName(nombre: string) {
    let url = this.apiUrl + "api/employees/nombre/buscar?nombre=" + nombre;
    //url = this.apiUrl + "api/employees/nombre/buscar";

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Listar todas las lineas
   * @returns
   */
   getLines() {
    let url = this.apiUrl + "api/lines/list/all";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }

  /**
   * Crear nuevo registro
   * @param linea_id
   * @param data
   * @returns
   */
  create(linea_id: number, data: any) {
    let url = this.apiUrl + "api/lines/" + linea_id +"/employees";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }

  /**
   * Actualizar registro
   * @param linea_id
   * @param id
   * @param data
   * @returns
   */
  update(linea_id: number, id:number, data: any) {
    let url = this.apiUrl + "api/lines/"+ linea_id +"/employees/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.put(url, data, { headers: headers });
  }
}
