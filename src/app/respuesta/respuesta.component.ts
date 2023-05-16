import { Component, OnInit } from '@angular/core';
import { RespuestaService } from '../services/respuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent implements OnInit {

  token: string = "";
  respuesta: string = "";
  solicitud: any = {};
  empleado: any = {};
  bono: string = "";
  observacion: string = "";

  proceso: boolean = false;
  error: string = "";
  exito: boolean = false;


  //promesa
  spinner: boolean = false;

  constructor(private respuestaService: RespuestaService) { }

  ngOnInit(): void {
    //obtener token y respuesta en la url
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    let token = params.get("token");
    let respuesta = params.get("respuesta");

    //validar token
    if (token == null || respuesta == null) {
      this.error = "Error en el proceso";
      this.exito = false;
    } else {
      //obtener token y respuesta
      this.token = token;
      if (respuesta == "aprobada") {
        this.respuesta = "Aprobada";
      } else {
        this.respuesta = "Rechazada";
      }
      //validar token
      this.getToken();
    }

  }

  getToken(): void {

    //iniciar spinner
    this.spinner = true;

    let data = {
      token: this.token,
    };

    //consultar datos
    this.respuestaService.token(data)
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          this.error = "";
          this.exito = true;

          //obtener datos
          this.solicitud = datos;
          this.empleado = datos.empleado;
          this.bono = datos.bono;
          this.bono = datos.bono.nombre + '\n' + datos.bono.beneficio + '\n' + datos.bono.descripcion;

          //apagar spinner
          this.spinner = false;
        },
        error: (e) => {
          //apagar spinner
          this.spinner = false;
          this.error = "Error en el proceso";
          this.exito = false;
          console.error(e)
        }
      });

  }

  create(): void {

    //iniciar spinner
    this.spinner = true;

    let data = {
      token: this.token,
      status: this.respuesta,
      observacion: this.observacion,
    };

    //consultar datos
    this.respuestaService.respuesta(data)
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          this.error = "";
          this.exito = false;
          this.proceso = true;

          Swal.fire("Ok", 'Proceso terminado con éxito', "success");

          //apagar spinner
          this.spinner = false;
        },
        error: (e) => {
          //apagar spinner
          this.spinner = false;
          this.error = "Error en el proceso";
          this.exito = false;
          console.error(e)
        }
      });

  }

  getDisable(): boolean {
    if (this.observacion == "") {
      return true;
    } else {
      return false;
    }
  }


}
