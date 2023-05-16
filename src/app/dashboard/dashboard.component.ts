import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //valores
  bonos: number = 0;
  bonosAprobados: number = 0;
  bonosPendientes: number = 0;
  empleados: number = 0;
  solicitudes: Array<any> = [];

  spinner: boolean = false;

  //paginacion
  last_page: number = 0;
  current_page: number = 0;
  prev: number = 0;
  next: number = 0;
  inicio: number = 0;
  rango: Array<any> = [];

  constructor(private dashboardService: DashboardService,) { }

  ngOnInit(): void {
    this.list(1);
  }

  list(page: number): void {

    //ajustar pagina
    var pagina = page - 1;

    this.spinner = true;

    this.dashboardService.list(pagina)
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          this.bonos = datos.data.bonos;
          this.bonosAprobados = datos.data.bonosAprobados;
          this.bonosPendientes = datos.data.bonosPendientes;
          this.empleados = datos.data.empleados;
          this.solicitudes = datos.data.solicitudes.content;

          // //crear paginacion
          let last_page = datos.data.solicitudes.totalPages;
          let current_page = datos.data.solicitudes.number + 1;
          this.getPaginacion(1, last_page, current_page);

          this.spinner = false;
        },
        error: (error) => {
          console.log(error)
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
}
