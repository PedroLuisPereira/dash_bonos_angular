import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BondService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Listar todos los registros
   * @param buscar
   * @returns
   */
  list(buscar: string = "") {

    let url = this.apiUrl + "api/bonds";

    if (buscar != "") {
      url = this.apiUrl + "api/bonds/?buscar=" + buscar;
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
  getBond(id: number) {
    let url = this.apiUrl + "api/bonds/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.get(url, { headers: headers });
  }


  /**
   * Nuevo registro
   * @param data
   * @returns
   */
  create(data: FormData ) {
    let url = this.apiUrl + "api/bonds";
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
  update(id: number, data: FormData) {
    let url = this.apiUrl + "api/bonds/" + id;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + localStorage.getItem("access_token"));
    return this.http.post(url, data, { headers: headers });
  }

  // getPosts() {
  //   const promise = new Promise<void>((resolve, reject) => {
  //     const apiURL = this.api;
  //     this.http.get(apiURL).subscribe({
  //       next: (res: any) => {
  //         this.data = res.map((res: any) => {
  //           return { "userId": res.userId, "id": res.id, "titel": res.title, "body": res.body }
  //         });
  //         resolve();
  //       },
  //       error: (err: any) => {
  //         reject(err);
  //       },
  //       complete: () => {
  //         console.log('complete');
  //       },
  //     });
  //   });
  //   return promise;
  // }

}
