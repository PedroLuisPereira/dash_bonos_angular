import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  vista: boolean = true;
  spinner: boolean = false;
  roles: string[];

  constructor(private authService: AuthService, private router: Router) {
    this.roles = [];

    //recarga o cierra la ventana
    window.onbeforeunload = function () {
      let fecha: Date = new Date();
      localStorage.setItem("x", fecha.getTime().toString());
    };

    if (localStorage.getItem("x") != null) {
      let x = Number(localStorage.getItem("x"));
      let fecha: Date = new Date();
      let y = Number(fecha.getTime().toString());

      if (y - x >= 60000) {
        //limpiar localStorage
        this.authService.setAuth(false);
        localStorage.clear()
        this.router.navigate(['']);
      }
    }

    this.validar();


  }

  //método onInit que se ejecuta una vez que el template de la componente está creado
  ngOnInit() {

  }

  /**
   * consultar usuario
   */
  validar(): void {

    //si se recarga la pagina y existe un token revisar token
    if (this.authService.getAuth() == false && localStorage.getItem('access_token') != null) {

      //prender
      this.spinner = true;

      //apagar la vista
      this.vista = false;

      //hacer consulta
      this.authService.getUser().subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //apagar
          this.spinner = false;

          //si esta autenticado
          this.authService.setAuth(true);

          //obtener roles
          this.roles = datos.user.roles;

          //ver si es admin
          let item: any = {};
          for (let index = 0; index < this.roles.length; index++) {
            item = this.roles[index];
            if (item.name == "ROLE_ADMIN") {
              this.authService.setIsAdmin(true);
            }
          }

          //activar la vista
          this.vista = true;

          //redirigir si la ruta es solo para admin y el usuario no es admin
          let ruta = this.router.url;
          let rutasNotUser = ["/usuarios"];  //rutas solo admin
          for (let index = 0; index < rutasNotUser.length; index++) {
            if (ruta == rutasNotUser[index] && this.authService.getIsAdmin() == false) {
              this.router.navigate(['404']);
            }
          }


        },
        error: (error) => {

          //apagar
          this.spinner = false;

          //activar la vista
          this.vista = true;

          //limpiar localStorage
          localStorage.clear();

          //no autenticado
          this.authService.setAuth(false);

          //enviar al login
          this.router.navigate(['login']);

        }
      });

    }

  }

}




//https://codingpotions.com/angular?stackedNotes=angular-seguridad
