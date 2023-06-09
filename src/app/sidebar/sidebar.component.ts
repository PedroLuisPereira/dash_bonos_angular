import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
  }

}
