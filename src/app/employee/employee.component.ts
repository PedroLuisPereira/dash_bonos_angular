import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  //arrays
  data: Array<any> = [];
  lines: Array<any> = [];

  //objetos
  employee: any = {};
  jefe: any = {};

  //campos
  id: number = 0;
  cedula: string = "";
  nombre: string = "";
  email: string = "";
  celular: string = "";
  celular_personal: string = "";
  email_personal: string = "";
  cargo: string = "";
  codigo: string = "";
  status: string = "";
  linea_id: number = 0;
  boss_id: number = 0;

  //autocomplete
  keyword = 'nombre';
  datas = [];

  //buscar
  buscar: string = "";

  //promesa
  spinner: boolean = false;
  btnGuardar: string = "Guardar";

  //validaciones
  errorCedula: string = "";
  isCedula: boolean = false;
  errorEmail: string = "";
  isEmail: boolean = false;
  errorCodigo: string = "";
  isCodigo: boolean = false;

  //paginacion
  paginaActual: number = 1;
  last_page: number = 0;
  current_page: number = 0;
  prev: number = 0;
  next: number = 0;
  inicio: number = 0;
  rango: Array<any> = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.list(this.paginaActual);
    this.getLines();
  }

  list(page: number): void {

    this.paginaActual = page;

    //ajustar pagina
    var pagina = page - 1;

    this.spinner = true;

    this.employeeService.list(pagina, this.buscar).subscribe({
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

  getLines(): void {

    this.employeeService.getLines().subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.lines = datos;

      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });

  }

  refresh() {
    this.clean();
    this.list(this.paginaActual);
  }

  getFecha(fecha: string): string {
    const f = new Date();
    let valor = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    return valor;
  }

  edit(id: number): void {

    //prender
    this.spinner = true;

    //hacer consulta
    this.employeeService.listByid(id).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.employee.nombre = this.nombre = datos.empleado.nombre;
        this.employee.cedula = this.cedula = datos.empleado.cedula;
        this.employee.email = this.email = datos.empleado.email;
        this.employee.celular = this.celular = datos.empleado.celular;
        this.employee.email_personal = this.email_personal = datos.empleado.email_personal;
        this.employee.celular_personal = this.celular_personal = datos.empleado.celular_personal;
        this.employee.cargo = this.cargo = datos.empleado.cargo;
        this.employee.codigo = this.codigo = datos.empleado.codigo;
        this.employee.linea = datos.empleado.linea.nombre;
        this.employee.company = datos.empleado.linea.company.nombre;
        this.employee.status = this.status = datos.empleado.status;
        this.employee.creacion = datos.empleado.creacion;
        this.employee.created_at = this.getFecha(datos.empleado.created_at);
        this.jefe.nombre = datos.jefe.nombre;
        this.jefe.cedula = datos.jefe.cedula;
        this.jefe.email = datos.jefe.email;
        this.linea_id = datos.empleado.linea.id;
        this.id = id;

        //apagar
        this.spinner = false;
      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)

        //apagar
        this.spinner = false;
      }
    });
  }

  listByName(nombre: string): void {

    this.employeeService.listByName(nombre).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.datas = datos;
      },
      error: (e) => {
        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
        this.spinner = false;
      }
    });


  }

  create(): void {

    //limpiar errores
    this.btnGuardar = "Guardando...";
    this.cleanErrors()

    let data = {
      cedula: this.cedula,
      nombre: this.nombre,
      email: this.email,
      celular: this.celular,
      celular_personal: this.celular_personal,
      email_personal: this.email_personal,
      cargo: this.cargo,
      codigo: this.codigo,
      boss_id: this.boss_id,
    };

    this.employeeService.create(this.linea_id, data,).subscribe({
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
          if (error.error.cedula) {
            this.errorCedula = error.error.cedula;
            this.isCedula = true;
          }
          if (error.error.email) {
            this.errorEmail = error.error.email;
            this.isEmail = true;
          }
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

  update(): void {

    //iniciar
    this.btnGuardar = "Guardando...";
    this.cleanErrors();

    let json = {
      cedula: this.cedula,
      nombre: this.nombre,
      email: this.email,
      celular: this.celular,
      celular_personal: this.celular_personal,
      email_personal: this.email_personal,
      cargo: this.cargo,
      codigo: this.codigo,
      status: this.status,
    };


    this.employeeService.update(this.linea_id, this.id, json).subscribe({
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
          if (error.error.cedula) {
            this.errorCedula = error.error.cedula;
            this.isCedula = true;
          }
          if (error.error.email) {
            this.errorEmail = error.error.email;
            this.isEmail = true;
          }
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
    if (this.nombre == ""
      || this.cedula == ""
      || this.email == ""
      || this.celular == ""
      || this.codigo == ""
      || this.linea_id == 0
      || this.boss_id == 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  getDisableEditar() {
    if (this.nombre == ""
      || this.cedula == ""
      || this.email == ""
      || this.celular == ""
      || this.codigo == ""
      || this.status == ""
      || this.linea_id == 0
    ) {
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
    this.cedula = "";
    this.email = "";
    this.celular = "";
    this.celular_personal = "";
    this.email_personal = "";
    this.cargo = "";
    this.status = "";
    this.boss_id = 0;
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    this.errorCedula = "";
    this.isCedula = false;
    this.errorEmail = "";
    this.isEmail = false;
    this.errorCodigo = "";
    this.isCodigo = false;
    this.btnGuardar = "Guardar";
  }

  cleanAll() {
    this.clean();
    this.cleanErrors();
  }

  selectEvent(item: any) {
    this.boss_id = item.id;
    console.log(this.boss_id);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.listByName(val);
  }

  onFocused(e: any) {
    // do something when input is focused
  }

}
