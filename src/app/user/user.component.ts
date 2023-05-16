import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //datos
  data: Array<any> = [];

  //usuario
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  rol: string = "";
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
  errorEmail: string = "";
  isEmail: boolean = false;
  errorPassword: string = "";
  isPassword: boolean = false;
  btnGuardar: string = "Guardar";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.list(this.paginaActual);
  }

  list(page: number): void {

    //estableces pagina actual
    this.paginaActual = page;

    //ajustar pagina
    var pagina = page - 1;

    //iniciar spinner
    this.spinner = true;

    //consultar datos
    this.userService.list(pagina, this.buscar).subscribe({
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

        //redirigir
        this.router.navigate(['dashboard']);

        //Swal.fire('Error en el servidor', '', 'error');
        console.error(e)
      }
    });
  }

  refresh() {
    this.clean();
    this.list(this.paginaActual);
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

  create(): void {

    //inicio
    this.cleanErrors()
    this.btnGuardar = "Guardando...";

    if (this.password != this.password_confirmation) {
      this.errorPassword = "Password no coinciden";
      this.isPassword = true;
      return;
    }

    let json = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.rol
    };

    this.userService.create(json).subscribe({
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
          if (error.error.email) {
            this.errorEmail = error.error.email;
            this.isEmail = true;
          }
        }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list(this.paginaActual);
    }, 3000);


  }

  ver(item: any): void {
    this.cleanErrors();

    this.id = item.id;
    this.name = item.name;
    this.email = item.email;
    this.rol = item.roles[0].name;
    this.status = item.status;
  }

  verPassword(item: any): void {
    this.cleanErrors();
    this.id = item.id;
    this.password = "";
    this.password_confirmation = "";
  }

  update(): void {

    //inicio
    this.cleanErrors()
    this.btnGuardar = "Guardando...";

    if (this.rol == "ROLE_ADMIN") {
      this.rol = "admin";
    }

    if (this.rol == "ROLE_USER") {
      this.rol = "user";
    }

    let json = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.rol,
      status: this.status
    };

    this.userService.update(this.id, json).subscribe({
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
          if (error.error.email) {
            this.errorEmail = error.error.email;
            this.isEmail = true;
          }
        }

        this.btnGuardar = "Guardar";
      }
    });

    setTimeout(() => {
      this.list(this.paginaActual);
    }, 3000);
  }

  updatePassword(): void {

    //inicio
    this.cleanErrors()
    this.btnGuardar = "Guardando...";

    if (this.password != this.password_confirmation) {
      this.errorPassword = "Password no coinciden";
      this.isPassword = true;
      return;
    }

    let json = {
      password: this.password,
    };

    this.userService.updatePassword(this.id, json).subscribe({
      next: (data) => {
        document.getElementById("closeModalPassword")?.click();
        Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
        this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          Swal.fire("Error en el proceso", '', "error");
        }

        this.btnGuardar = "Guardar";
      }
    });
  }

  getDisable(): boolean {
    if (this.name == ""
      || this.email == ""
      || this.password == ""
      || this.password_confirmation == ""
      || this.rol == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisableUpdate(): boolean {
    if (this.name == ""
      || this.email == ""
      || this.rol == ""
      || this.status == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisablePassword(): boolean {
    if (this.password == ""
      || this.password_confirmation == ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  clean(): void {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.password = "";
    this.password_confirmation = "";
    this.rol = "";
    this.status = "";
    this.buscar = "";
    this.btnGuardar = "Guardar";
  }

  cleanErrors(): void {
    this.errorEmail = "";
    this.isEmail = false;
    this.errorPassword = "";
    this.isPassword = false;
    this.btnGuardar = "Guardar";
  }

  cleanAll(): void {
    this.clean();
    this.cleanErrors();
  }


  /*
  Ejemplo
  api: string = 'https://jsonplaceholder.typicode.com/posts';
  data = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.api;
      this.http.get(apiURL).subscribe({
        next: (res: any) => {
          this.data = res.map((res: any) => {
            return { "userId": res.userId, "id": res.id, "titel": res.title, "body": res.body }
          });
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
*/
}
