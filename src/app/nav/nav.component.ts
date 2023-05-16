import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  name: any = "";
  avatar: any = "";

  constructor(private AuthService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.name = localStorage.getItem('name') != null ? localStorage.getItem('name') : "";
    this.avatar = localStorage.getItem('avatar') != null ? localStorage.getItem('avatar') : "";
  }

  logout(): void {
    //limpiar localStorage
    localStorage.clear()

    //logout
    this.AuthService.setAuth(false);

    //redirigir
    this.router.navigate(['login']);

  }

}
