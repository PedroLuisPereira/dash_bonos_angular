import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  //datos
  data: Array<any> = [];
  id: number = 0;
  nombre: string = "";
  codigo: string = "";
  status: string = "";

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

  constructor(private CompanyService: CompanyService) { }

  ngOnInit(): void {
    this.list(this.paginaActual);
  }

  list(page: number): void {

    this.paginaActual = page;

    //ajustar pagina
    var pagina = page - 1;

    this.spinner = true;

    this.CompanyService.list(pagina, this.buscar)
      .subscribe({
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

  refresh() {
    this.clean();
    this.list(this.paginaActual);
  }

  create(): void {

    //iniciar
    this.btnGuardar = "Guardando...";
    this.cleanErrors();

    //json
    let json = {
      nombre: this.nombre,
      codigo: this.codigo
    };


    this.CompanyService.create(json).subscribe({
        next: (data) => {
          //cerrar modal
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

  edit(company: any): void {
    this.id = company.id;
    this.nombre = company.nombre;
    this.codigo = company.codigo;
    this.status = company.status;
    this.cleanErrors();
  }

  update(): void {
    this.cleanErrors();
    this.btnGuardar = "Guardando...";

    let json = {
      nombre: this.nombre,
      codigo: this.codigo,
      status: this.status
    };

    this.CompanyService.update(this.id, json).subscribe({
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

  getDisable() {
    if (this.nombre == "" || this.codigo == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisableUpdate() {
    if (this.nombre == "" || this.codigo == "" || this.status == "") {
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
    this.buscar = "";
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    this.errorCodigo = "";
    this.isCodigo = false;
    this.btnGuardar = "Guardar";
  }

  cleanAll(){
    this.clean();
    this.cleanErrors();
  }


  // tinyAlert() {
  //   Swal.fire('Hey there!');
  // }
  // successNotification() {
  //   Swal.fire('Hi', 'We have been informed!', 'success');
  // }

  // alertConfirmation() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think',
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire('Removed!', 'Product removed successfully.', 'success');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'Product still in our database.)', 'error');
  //     }
  //   });
  // }






}

