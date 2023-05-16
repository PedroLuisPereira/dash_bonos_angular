import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  roles: string[];

  //promesa
  spinner: boolean = false;

  //error
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.roles = [];
  }

  ngOnInit(): void {
  }


  login(): void {

    //datos
    let json = {
      email: this.email,
      password: this.password
    }

    //prender
    this.spinner = true;

    //apagar
    this.error = false;

    //hacer consulta
    this.authService.login(json).subscribe({
      next: (data) => {

        //capturar data
        let datos: any;
        datos = data;

        //almacenar valores
        localStorage.setItem("access_token", datos.accessToken);
        localStorage.setItem("name", datos.name);
        localStorage.setItem("avatar", datos.avatar );

        //obtener roles
        this.roles = datos.roles;

        //ver si tiene el rol de admin
        this.authService.setIsAdmin(this.roles.includes('ROLE_ADMIN'));

        //autenticar
        this.authService.setAuth(true);

        //redirigir
        this.router.navigate(['dashboard']);

        //apagar
        this.spinner = false;

      },
      error: (error) => {

        //prender
        this.error = true;

        //apagar
        this.spinner = false;

        console.log(error);

      }
    });

  }

  getDisable(): boolean {
    if (this.email == "" || this.password == "") {
      return true;
    } else {
      return false;
    }
  }
}
