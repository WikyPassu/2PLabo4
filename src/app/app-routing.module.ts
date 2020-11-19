import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./paginas/home/home.component";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { NotLoggedInGuard } from "./guards/not-logged-in.guard";
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './paginas/registrarse/registrarse.component';
import { CerrarSesionComponent } from './paginas/cerrar-sesion/cerrar-sesion.component';
import { NotFoundComponent } from "./paginas/not-found/not-found.component";
import { AltaAdminComponent } from './paginas/alta-admin/alta-admin.component';
import { AltaMateriaComponent } from './paginas/alta-materia/alta-materia.component';
import { InscripcionMateriaComponent } from './paginas/inscripcion-materia/inscripcion-materia.component';
import { ListadoMateriasComponent } from './paginas/listado-materias/listado-materias.component';
import { ListadoUsuariosComponent } from './paginas/listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'alta-admin',
    component: AltaAdminComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'alta-materia',
    component: AltaMateriaComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'inscripcion-materia',
    component: InscripcionMateriaComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'listado-materias',
    component: ListadoMateriasComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'listado-usuarios',
    component: ListadoUsuariosComponent,
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
