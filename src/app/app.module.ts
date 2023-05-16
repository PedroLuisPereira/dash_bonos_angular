//core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//modulos creados
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { CompanyComponent } from './company/company.component';
import { LineComponent } from './line/line.component';

//librerias
import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

//auth
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';

import { AuthModule } from './auth/auth.module';
import { EmployeeComponent } from './employee/employee.component';
import { BondComponent } from './bond/bond.component';
import { EmployeeBondComponent } from './employee-bond/employee-bond.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { UserComponent } from './user/user.component';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { NofoudComponent } from './nofoud/nofoud.component';
import { ChatComponent } from './chat/chat.component';
import { BonosListComponent } from './bonos-list/bonos-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    SidebarComponent,
    DashboardComponent,
    CompanyComponent,
    LineComponent,
    //*****/
    HeaderComponent,
    ProfileComponent,
    AuthComponent,
    EmployeeComponent,
    BondComponent,
    EmployeeBondComponent,
    SolicitudComponent,
    UserComponent,
    RespuestaComponent,
    NofoudComponent,
    ChatComponent,
    BonosListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SpinnerCircularModule,
    AuthModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
