import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/paginas/home/home.component";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { NotLoggedInGuard } from "./guards/not-logged-in.guard";
import { IniciarSesionComponent } from './components/paginas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/paginas/registrarse/registrarse.component';
import { CerrarSesionComponent } from './components/paginas/cerrar-sesion/cerrar-sesion.component';
import { NotFoundComponent } from "./components/paginas/not-found/not-found.component";
import { AltaMascotaComponent } from './components/paginas/alta-mascota/alta-mascota.component';
import { ListadoMascotasComponent } from './components/paginas/listado-mascotas/listado-mascotas.component';
import { ListadoTurnosComponent } from './components/paginas/listado-turnos/listado-turnos.component';
import { PedirTurnoComponent } from './components/paginas/pedir-turno/pedir-turno.component';
import { ChatComponent } from './components/paginas/chat/chat.component';
import { ModificarMascotaComponent } from "./components/paginas/modificar-mascota/modificar-mascota.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'alta-mascota',
    component: AltaMascotaComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'listado-mascotas',
    component: ListadoMascotasComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'listado-turnos',
    component: ListadoTurnosComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'pedir-turno',
    component: PedirTurnoComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'modificar-mascota',
    component: ModificarMascotaComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'registro',
    component: RegistrarseComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
