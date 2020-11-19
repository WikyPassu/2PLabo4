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
import { HomeComponent } from './components/paginas/home/home.component';
import { NotFoundComponent } from './components/paginas/not-found/not-found.component';
import { IniciarSesionComponent } from './components/paginas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/paginas/registrarse/registrarse.component';
import { CerrarSesionComponent } from './components/paginas/cerrar-sesion/cerrar-sesion.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AltaMascotaComponent } from './components/paginas/alta-mascota/alta-mascota.component';
import { ListadoMascotasComponent } from './components/paginas/listado-mascotas/listado-mascotas.component';
import { ListadoTurnosComponent } from './components/paginas/listado-turnos/listado-turnos.component';
import { ChatComponent } from './components/paginas/chat/chat.component';
import { PedirTurnoComponent } from './components/paginas/pedir-turno/pedir-turno.component';
import { CardEmailComponent } from './components/card-email/card-email.component';
import { ModificarMascotaComponent } from './components/paginas/modificar-mascota/modificar-mascota.component';

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
    AltaMascotaComponent,
    ListadoMascotasComponent,
    ListadoTurnosComponent,
    ChatComponent,
    PedirTurnoComponent,
    CardEmailComponent,
    ModificarMascotaComponent,
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
