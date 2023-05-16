import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

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
  token(data: any) {
    let url = this.apiUrl + "api/landing/token";
    return this.http.post(url, data);
  }

  respuesta(data: any) {
    let url = this.apiUrl + "api/landing/respuesta";
    return this.http.post(url, data);
  }
}
