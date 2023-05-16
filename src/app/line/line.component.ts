import { Component, OnInit } from '@angular/core';
import { LineService } from '../services/line.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  //datos
  data: Array<any> = [];
  companies: Array<any> = [];

  //linea
  id: number = 0;
  nombre: string = "";
  codigo: string = "";
  status: string = "";
  companyId: number = 0;

  //buscar
  buscar: string = "";

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

  constructor(private lineService: LineService) { }

  ngOnInit(): void {
    this.list(this.paginaActual);
    this.getCompanies();
  }

  list(page: number): void {

    //estableces pagina actual
    this.paginaActual = page;

    //ajustar pagina
    var pagina = page - 1;

    //iniciar spinner
    this.spinner = true;

    //consultar datos
    this.lineService.list(pagina, this.buscar).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.data = datos.content;

        //apagar spinner
        this.spinner = false;

        //crear paginacion
        let last_page = datos.totalPages;
        let current_page = datos.number + 1;
        this.getPaginacion(1, last_page, current_page);
      },
      error: (e) => {
        //apagar spinner
        this.spinner = false;

        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });

  }

  getCompanies(): void {

    //reiniciar data
    this.companies = [];

    //consultar datos
    this.lineService.getCompanies().subscribe({
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

  refresh() {
    this.clean();
    this.list(this.paginaActual);
  }

  create(): void {
    //iniciar
    this.btnGuardar = "Guardando...";
    this.cleanErrors();

    let json = {
      nombre: this.nombre,
      codigo: this.codigo,
    };

    this.lineService.create(this.companyId, json).subscribe({
      next: (data) => {
        document.getElementById("closeModalCreate")?.click();
        Swal.fire('Guardado', 'Registro creado con éxito', 'success');
        this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          Swal.fire("Error en el proceso", '', "error");
        }

        if (error.status == 422) {
          if (error.error.codigo) {
            this.errorCodigo = error.error.codigo;
            this.isCodigo = true;
          }
        }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list(this.paginaActual);
    }, 3000);


  }

  edit(item: any): void {
    this.id = item.id;
    this.nombre = item.nombre;
    this.codigo = item.codigo;
    this.companyId = item.company.id;
    this.status = item.status;
    this.cleanErrors();
  }

  update(): void {
    //iniciar
    this.btnGuardar = "Guardando...";
    this.cleanErrors();

    let json = {
      nombre: this.nombre,
      codigo: this.codigo,
      status: this.status
    };

    this.lineService.update(this.companyId, this.id, json).subscribe({
        next: (data) => {
          document.getElementById("closeModalEdit")?.click();
          Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
          this.cleanErrors();
        },
        error: (error) => {

          if (error == undefined) {
            Swal.fire("Error en el proceso", '', "error");
          }

          if (error.status == 422) {
            if (error.error.codigo) {
              this.errorCodigo = error.error.codigo;
              this.isCodigo = true;
            }
          }

          this.btnGuardar = "Guardar";
        }
      });

    setTimeout(() => {
      this.list(this.paginaActual);
    }, 3000);
  }

  getDisable(): boolean {
    if (this.nombre == "" || this.codigo == "" || this.companyId == 0) {
      return true;
    } else {
      return false;
    }
  }

  getDisableUpdate(): boolean {
    if (this.nombre == "" || this.codigo == "" || this.companyId == 0 || this.status == "") {
      return true;
    } else {
      return false;
    }
  }

  clean(): void {
    this.id = 0;
    this.nombre = "";
    this.codigo = "";
    this.status = "";
    this.companyId = 0;
    this.buscar = "";
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    this.errorCodigo = "";
    this.isCodigo = false;
    this.btnGuardar = "Guardar";
  }

  cleanAll(): void {
    this.clean();
    this.cleanErrors();
  }
}
