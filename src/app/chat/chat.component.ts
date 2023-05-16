import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  //datos
  chats: Array<any> = [];
  empleado: string = "";
  mensaje: string = "";
  fecha: string = "";
  id: number;

  socket: any;
  respuesta: any;

  //promesa
  spinner: boolean = false;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    this.getEmployee(this.id);
    this.list(this.id);
  }

  ngOnInit(): void {
    const subject = webSocket('ws://192.168.1.126:8080/socket');

    const data: Object = {
      de: '',
      para: '',
      mensaje: '',
      fecha: ''
    };

    type Respuesta = {
      de: '',
      para: '',
      mensaje: '',
      fecha: ''
    };

    subject.subscribe({
      next: data => {

        let respuesta = <Respuesta>data;

        if (respuesta.de == this.id.toString() || respuesta.para == this.id.toString()) {
          this.chats.push(data);
        }

      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });


  }

  getEmployee(id: number) {
    this.spinner = true;

    this.chatService.listByid(id).subscribe({
      next: (data) => {
        //capturar data
        let datos: any;
        datos = data;

        //obtener datos
        this.empleado = datos.empleado.nombre;

        //apagar
        this.spinner = false;
      },
      error: (e) => {
        console.error(e)
        this.spinner = false;
      }
    });
  }

  list(id: number): void {

    this.spinner = true;

    this.chatService.list(id)
      .subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //obtener datos
          this.chats = datos;

          //apagar
          this.spinner = false;
        },
        error: (e) => {
          //Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
          this.spinner = false;
        }
      });

  }

  getFecha(fecha: string): string {
    let fecha2 = new Date(fecha);
    let mes = fecha2.getMonth() + 1 < 10 ? "0" + (fecha2.getMonth() + 1) : fecha2.getMonth() + 1;
    let dia = fecha2.getDate() < 10 ? "0" + fecha2.getDate() : fecha2.getDate();
    let hora = fecha2.getHours() < 10 ? "0" + fecha2.getHours() : fecha2.getHours();
    let minutos = fecha2.getMinutes() < 10 ? "0" + fecha2.getMinutes() : fecha2.getMinutes();
    let f = fecha2.getFullYear() + "/" + mes + "/" + dia + " " + hora + ":" + minutos;
    return f;
  }

  send(): void {

    const subject = webSocket('ws://192.168.1.126:8080/socket');

    subject.subscribe();
    // Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
    // since no connection was established!

    let data = {
      de: "Admin",
      para: this.id,
      mensaje: this.mensaje,
      fecha: new Date()
    };

    subject.next(data);
    // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!

    subject.complete(); // Closes the connection.

    subject.error({ code: 4000, reason: 'I think our app just broke!' });
    // Also closes the connection, but let's the server know that this closing is caused by some error

    this.mensaje = "";
  }

  create(): void {
    let data = {
      de: "Admin",
      para: this.id,
      mensaje: this.mensaje,
    };

    //this.btnGuardar = "Guardando...";

    this.chatService.create(data)
      .subscribe({
        next: (data) => {
          //this.mensaje = "";
        },
        error: (error) => {
          this.mensaje = "";
          console.log(error);
        }
      });

    this.send();
  }

}
