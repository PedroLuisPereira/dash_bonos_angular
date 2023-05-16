import { Component, OnInit } from '@angular/core';
import { BondService } from '../services/bond.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bond',
  templateUrl: './bond.component.html',
  styleUrls: ['./bond.component.css']
})
export class BondComponent implements OnInit {

  //datos
  data: Array<any> = [];
  item: any = "";

  //bono
  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  beneficio: string = "";
  cantidad: number = 0;
  categoria: string = "";
  imagen: any = "";
  status: string = "";

  //buscar
  buscar: string = "";

  //promesa
  spinner: boolean = false;

  //validaciones
  errorNombre: string = "";
  isNombre: boolean = false;
  errorFile: string = "";
  btnGuardar: string = "Guardar";

  constructor(private bondService: BondService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {

    //iniciar spinner
    this.spinner = true;

    //consultar datos
    this.bondService.list(this.buscar).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.data = datos;

        //apagar spinner
        this.spinner = false;

      },
      error: (e) => {
        //apagar spinner
        this.spinner = false;

        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });

  }

  refresh() {
    this.clean();
    this.list();
  }

  uploadImage(event: any): void {
    this.imagen = <File>event.target.files[0]
  }

  create(): void {

    //iniciar
    this.cleanErrors();
    this.btnGuardar = "Guardando...";

    //crear formData
    var data = new FormData();
    data.append("nombre", this.nombre);
    data.append("descripcion", this.descripcion);
    data.append("beneficio", this.beneficio);
    data.append("cantidad", this.cantidad.toString());
    data.append("categoria", this.categoria);
    data.append("file", this.imagen);

    //consultar
    this.bondService.create(data).subscribe({
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
          if (error.error.nombre) {
            this.errorNombre = error.error.nombre;
            this.isNombre = true;
          } else {
            Swal.fire("Error en el proceso", '', "error");
          }
        }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list();
    }, 3000);


  }

  edit(id: number): void {
    //reiniciar data
    this.item = [];

    //iniciar spinner
    this.spinner = true;

    //consultar datos
    this.bondService.getBond(id).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener todos los datos
        this.item = datos;

        //obtener cada valor
        this.id = datos.id;
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.beneficio = datos.beneficio;
        this.cantidad = datos.cantidad;
        this.categoria = datos.categoria;
        this.status = datos.status;

        //apagar spinner
        this.spinner = false;

      },
      error: (e) => {
        //apagar spinner
        this.spinner = false;

        Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });
  }

  update(): void {
    //iniciar
    this.cleanErrors();
    this.btnGuardar = "Guardando...";

    //crear formData
    var data = new FormData();
    data.append("nombre", this.nombre);
    data.append("descripcion", this.descripcion);
    data.append("beneficio", this.beneficio);
    data.append("cantidad", this.cantidad.toString());
    data.append("categoria", this.categoria);
    data.append("status", this.status);
    data.append("file", this.imagen);

    console.log(data);


    //consultar
    this.bondService.update(this.id, data).subscribe({
      next: (data) => {
        document.getElementById("closeModalEdit")?.click();
        Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
        this.btnGuardar = "Guardar";
        this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          Swal.fire("Error en el proceso", '', "error");
        }

        if (error.status == 422) {
          if (error.error.nombre) {
            this.errorNombre = error.error.nombre;
            this.isNombre = true;
          }else{
            Swal.fire("Error en el proceso", '', "error");
          }
        }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list();
    }, 3000);
  }

  getDisable(): boolean {
    if (this.nombre == ""
      || this.descripcion == ""
      || this.beneficio == ""
      || this.cantidad == 0
      || this.categoria == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisableUpdate(): boolean {
    if (this.nombre == ""
      || this.descripcion == ""
      || this.beneficio == ""
      || this.cantidad == 0
      || this.categoria == ""
      || this.status == ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  clean(): void {
    this.item = "";
    this.id = 0;
    this.nombre = "";
    this.descripcion = "";
    this.beneficio = "";
    this.cantidad = 0;
    this.categoria = "";
    this.imagen = null;
    this.status = "";
    this.buscar = "";
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    this.errorNombre = "";
    this.isNombre = false;
    this.btnGuardar = "Guardar";
  }

  cleanAll(): void {
    this.clean();
    this.cleanErrors();
  }

  // getPosts() {
  //   const promise = new Promise<void>((resolve, reject) => {
  //     this.bondService.list(this.buscar).subscribe({
  //       next: (res: any) => {
  //         this.data = res;

  //         // this.data = res.map((res: any) => {
  //         //   return { "userId": res.userId, "id": res.id, "titel": res.title, "body": res.body }
  //         // });
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

  //La función resolve() se invoca cuando se completa la tarea asíncrona y presenta el resultado de las tareas asignadas.
  //La segunda reject() es una función es una función de rechazo (), que se invoca cuando la tarea asignada falla y devuelve el motivo con el objeto de error.


}
