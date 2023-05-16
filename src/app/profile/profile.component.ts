import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: Array<any> = [];
  avatar: string = "";
  email: string = "";
  id: string = "";
  name: string = "";
  roles: string = "";
  status: string = "";
  imagen: any = "";
  passwordOld: string = "";
  password: string = "";
  passwordConfirmation: string = "";


  btnPerfil = "Guardar";
  btnPassword = "Guardar";
  btnAvatar = "Guardar";

  errorPassword: string = "";
  isPassword: boolean = false;

  //promesa
  spinner: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {

    //iniciar spinner
    this.spinner = true;

    //consultar datos
    this.profileService.list()
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //obtener datos
          this.data = datos;
          this.name = datos.name;
          this.email = datos.email;
          this.roles = datos.roles[0].name;
          this.avatar = datos.avatar;

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

  uploadImage(event: any): void {
    this.imagen = <File>event.target.files[0]
  }

  setAvatar(): void {

    //iniciar
    this.cleanErrors();
    this.btnAvatar = "Guardando...";

    //crear formData
    var data = new FormData();
    data.append("file", this.imagen);

    //consultar
    this.profileService.avatar(data).subscribe({
      next: (data) => {
        Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
        this.cleanErrors();
        this.btnAvatar = "Guardar";
      },
      error: (error) => {
        this.btnAvatar = "Guardar";
        Swal.fire("Error en el proceso", '', "error");
      }
    });

    setTimeout(() => {
      this.list();
    }, 3000);

  }

  perfil(): void {
    let data = {
      name: this.name,
    };

    this.btnPerfil = "Guardando...";

    this.profileService.perfil(data)
      .subscribe({
        next: (data) => {
          Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
          this.btnPerfil = "Guardar";
        },
        error: (error) => {
          Swal.fire("Error en el proceso", '', "error");
          this.btnPerfil = "Guardar";
        }
      });

    setTimeout(() => {
      this.list();
    }, 3000);


  }

  setPassword(): void {

    //inicio
    this.cleanErrors();
    this.btnPassword = "Guardando...";

    if (this.password != this.passwordConfirmation) {
      this.errorPassword = "Password no coinciden";
      this.isPassword = true;
      this.btnPassword = "Guardar";
      return;
    }

    let data = {
      password: this.password,
      password_old: this.passwordOld
    };

    this.profileService.password(data)
      .subscribe({
        next: (data) => {
          Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
          this.btnPassword = "Guardar";
          this.passwordOld = "";
          this.password = "";
          this.passwordConfirmation = "";
        },
        error: (error) => {
          Swal.fire("Error en el proceso", '', "error");
          this.btnPassword = "Guardar";
          this.passwordOld = "";
          this.password = "";
          this.passwordConfirmation = "";
        }
      });

  }

  cleanErrors(): void {
    this.errorPassword = "";
    this.isPassword = false;
  }


}
