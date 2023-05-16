import { Component, OnInit } from '@angular/core';
import { EmployeeBondService } from '../services/employee-bond.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bonos-list',
  templateUrl: './bonos-list.component.html',
  styleUrls: ['./bonos-list.component.css']
})
export class BonosListComponent implements OnInit {

  data: Array<any> = [];
  empleado: string = "";

  //promesa
  spinner: boolean = false;
  id: number;

  constructor(private employeeBondService: EmployeeBondService, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    this.getEmployee(this.id);
    this.list(this.id);
  }

  ngOnInit(): void {
  }

  list(id:number){
    this.spinner = true;

    this.employeeBondService.list(id).subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          this.data = datos;
          console.log(this.data);


          this.spinner = false;
        },
        error: (e) => {
          console.error(e)
          this.spinner = false;
        }
      });
  }

  getEmployee(id:number){
    this.spinner = true;

    this.employeeBondService.listByid(id).subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //obtener datos
          this.empleado = datos.empleado.nombre;

          this.spinner = false;
        },
        error: (e) => {
          console.error(e)
          this.spinner = false;
        }
      });
  }

}
