import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './paginas/home/home.component';
import { NotFoundComponent } from './paginas/not-found/not-found.component';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './paginas/registrarse/registrarse.component';
import { CerrarSesionComponent } from './paginas/cerrar-sesion/cerrar-sesion.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AltaAdminComponent } from './paginas/alta-admin/alta-admin.component';
import { AltaMateriaComponent } from './paginas/alta-materia/alta-materia.component';
import { InscripcionMateriaComponent } from './paginas/inscripcion-materia/inscripcion-materia.component';
import { ListadoMateriasComponent } from './paginas/listado-materias/listado-materias.component';
import { ListadoUsuariosComponent } from './paginas/listado-usuarios/listado-usuarios.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ToolbarComponent,
    CardComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    CerrarSesionComponent,
    SpinnerComponent,
    AltaAdminComponent,
    AltaMateriaComponent,
    InscripcionMateriaComponent,
    ListadoMateriasComponent,
    ListadoUsuariosComponent,
    FormRegistroComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
