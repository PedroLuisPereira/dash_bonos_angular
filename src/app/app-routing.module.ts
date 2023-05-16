import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//guardia
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

//paginas
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { LineComponent } from './line/line.component';
import { EmployeeComponent } from './employee/employee.component';
import { BonosListComponent } from './bonos-list/bonos-list.component';

import { BondComponent } from './bond/bond.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ProfileComponent } from './profile/profile.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';


import { NofoudComponent } from './nofoud/nofoud.component';




const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'companias',
    component:CompanyComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'lineas',
    component:LineComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'empleados',
    component:EmployeeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'bonos/:id',
    component:BonosListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'bonos',
    component:BondComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'solicitudes',
    component:SolicitudComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'perfil',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'respuesta',
    component:RespuestaComponent,
  },
  {
    path:'usuarios',
    component:UserComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'chat/:id',
    component:ChatComponent,
    //canActivate:[AuthGuard]
  },
  {
    path: '404',
    component:NofoudComponent,
  },
  {
    path: '**',
    component:NofoudComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


//https://github.com/adexin/spinners-angular
//https://sweetalert2.github.io/#donations


// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';

// import { ProfileComponent } from './profile/profile.component';
// import { HomeComponent } from './home/home.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
