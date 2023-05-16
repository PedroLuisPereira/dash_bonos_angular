import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../services/solicitud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  //datos
  data: any[] = [];
  companies: any = [];

  //objeto
  solicitud: any = {
    id: "",
    bond_id: "",
    employee_id: "",
    boss_id: "",
    fecha_solicitud: "",
    fecha_uso: "",
    fecha_aprobacion: "",
    status: "",
    observacion: "",
    bono: {
      id: "",
      nombre: "",
      descripcion: "",
      beneficio: "Un día",
      cantidad: "",
      categoria: "",
    },
    empleado: {
      id: "",
      cedula: "",
      nombre: "",
      email: "",
      celular: "",
      email_personal: "",
      celular_personal: "",
      cargo: "",
      codigo: "",
      status: "",
      created_at: "",
      linea: {
        nombre: "",
        company: {
          nombre: "",
        }
      }
    },
    jefe: {
      id: "",
      cedula: "",
      nombre: "",
      email: "",
      celular: "",
      email_personal: "",
      celular_personal: "",
      cargo: "",
      codigo: "",
      status: "",
      created_at: "",
      linea: {
        nombre: "",
        company: {
          nombre: "",
        }
      }
    },
  }

  //buscar
  fecha_inicio: string = "";
  fecha_fin: string = "";
  status: string = '';
  company: string = "";
  cedula: string = "";
  cedula_jefe: string = "";

  //promesa
  spinner: boolean = false;

  //paginacion
  paginaActual: number = 1;
  last_page: number = 0;
  current_page: number = 0;
  prev: number = 0;
  next: number = 0;
  inicio: number = 0;
  rango: Array<any> = [];

  //validaciones
  errorCodigo: string = "";
  isCodigo: boolean = false;
  btnGuardar: string = "Guardar";


  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.list(0);
    this.getCompanies();
  }

  list(page: number): void {

    this.paginaActual = page;

    //ajustar pagina
    var pagina = page - 1;

    //fecha actual
    let fecha = new Date();

    //prender
    this.spinner = true;

    //si no se coloca fecha inicial
    if (this.fecha_inicio == "") {
      this.fecha_inicio = fecha.getFullYear() + '-' + "01" + "-01";
    }

    //si no se coloca fecha fin
    if (this.fecha_fin == "") {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      if (mes < 10) {
        mes = + '0' + mes;
      }
      if (dia < 10) {
        dia = + '0' + dia;
      }
      this.fecha_fin = fecha.getFullYear() + '-' + mes + '-' + dia;
    }

    //valores iniciales al recargar pagina
    if (page == 0) {
      pagina = 0;

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;

      let diaReal: string = "";
      let mesReal: string = "";
      if (mes < 10) {
        mesReal = + '0' + "" + mes;
      } else {
        mesReal = "" + mes;
      }

      if (dia < 10) {
        diaReal = '0' + "" + dia;
      } else {
        diaReal = "" + dia;
      }

      //valores iniciales
      this.fecha_inicio = fecha.getFullYear() + '-' + "01" + "-01";
      this.fecha_fin = fecha.getFullYear() + '-' + mesReal + '-' + diaReal;
      this.status = "";
      this.company = "";
      this.cedula = "";
      this.cedula_jefe = "";
    }

    this.solicitudService.list(pagina, this.fecha_inicio, this.fecha_fin, this.status, this.company, this.cedula, this.cedula_jefe).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.data = datos.content;

        //crear paginacion
        let last_page = datos.totalPages;
        let current_page = datos.number + 1;
        this.getPaginacion(1, last_page, current_page);

        this.spinner = false;
      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
        this.spinner = false;
      }
    });


  }

  getPaginacion(page: number, last_page: number, current_page: number) {

    this.rango = [];

    //paginacion
    this.last_page = last_page;

    //obtener el rango
    if (this.last_page > 5) {

      for (let index = 0; index < 5; index++) {
        this.rango.push(index);
      }
      //this.rango = 5;
    } else {
      for (let index = 0; index < this.last_page; index++) {
        this.rango.push(index);
      }
      //this.rango = this.last_page;
    }

    //obtener i (inicio del for)
    if (page < 3) {
      this.inicio = 1;
    }

    if (page > 2) {
      this.inicio = page - 2;
    }

    if (page + 2 > this.last_page) {
      this.inicio = this.last_page - this.rango.length + 1;
    }

    this.current_page = current_page;
    this.prev = this.current_page - 1 < 1 ? 1 : this.current_page - 1;
    this.next = this.current_page + 1 > this.last_page ? this.last_page : this.current_page + 1;

  }

  getCompanies(): void {

    //reiniciar data
    this.companies = [];

    //consultar datos
    this.solicitudService.getCompanies()
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //obtener datos
          this.companies = datos;

        },
        error: (e) => {
          Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
        }
      });

  }

  ver(item: any): void {
    this.solicitud = item;
  }

  exportar(): void {

    //fecha actual
    let fecha = new Date();

    //prender
    this.spinner = true;

    //si no se coloca fecha inicial
    if (this.fecha_inicio == "") {
      this.fecha_inicio = fecha.getFullYear() + '-' + "01" + "-01";
    }

    //si no se coloca fecha fin
    if (this.fecha_fin == "") {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      if (mes < 10) {
        mes = + '0' + mes;
      }
      if (dia < 10) {
        dia = + '0' + dia;
      }
      this.fecha_fin = fecha.getFullYear() + '-' + mes + '-' + dia;
    }


    this.solicitudService.exportar(this.fecha_inicio, this.fecha_fin, this.status, this.company, this.cedula, this.cedula_jefe).subscribe({
      next: (data) => {
        this.spinner = false;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "solicitudes.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
        this.spinner = false;
      }
    });


  }

  exportarConsolidado(): void {

    //fecha actual
    let fecha = new Date();

    //prender
    this.spinner = true;

    //si no se coloca fecha inicial
    if (this.fecha_inicio == "") {
      this.fecha_inicio = fecha.getFullYear() + '-' + "01" + "-01";
    }

    //si no se coloca fecha fin
    if (this.fecha_fin == "") {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      if (mes < 10) {
        mes = + '0' + mes;
      }
      if (dia < 10) {
        dia = + '0' + dia;
      }
      this.fecha_fin = fecha.getFullYear() + '-' + mes + '-' + dia;
    }


    this.solicitudService.exportarConsolidado(this.fecha_inicio, this.fecha_fin).subscribe({
      next: (data) => {
        this.spinner = false;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "consolidado.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
        this.spinner = false;
      }
    });


  }

  reenviarAll(): void {

    //prender
    this.spinner = true;

    //consultar datos
    this.solicitudService.reenviarAll()
      .subscribe({
        next: (data) => {

          //apagar
          this.spinner = true;

          Swal.fire('Ok', 'Solicitudes de aprobacion enviadas éxito', 'success');

        },
        error: (e) => {
          Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
        }
      });

  }

  reenviar(id: number): void {

    //prender
    this.spinner = true;

    //consultar datos
    this.solicitudService.reenviar(id)
      .subscribe({
        next: (data) => {

          //apagar
          this.spinner = true;

          Swal.fire('Ok', 'Solicitud de aprobación enviada éxito', 'success');

        },
        error: (e) => {
          Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
        }
      });

  }

  rechazar(id: number): void {

    //prender
    this.spinner = true;

    //consultar datos
    this.solicitudService.rechazar(id)
      .subscribe({
        next: (data) => {

          //apagar
          this.spinner = false;

          Swal.fire('Ok', 'Solicitud rechazada con éxito', 'success');

        },
        error: (e) => {
          this.spinner = false;
          Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
        }
      });

    setTimeout(() => {
      this.list(this.paginaActual);
    }, 3000);

  }

}
