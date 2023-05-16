import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  //listar todos los datos
  list(pagina:number) {
    let url = this.apiUrl + "api/dashboard" + "?page=" + pagina;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token") );
    return this.http.get(url, { headers: headers });
  }

  //cabeceras
  // const httpOption = {
  //   headers : new HttpHeaders({
  //     'Conten-type' : "application/json; charset=UTF-8"
  //   })
  // }

  //return this.http.get(url, httpOption );

}
