import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import { MenuItemsService } from "./menu-items.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = null;
  usuario: any = {};

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private menu: MenuItemsService) {
    this.auth.authState.subscribe(state => {
      this.authState = state;
      if(this.authState != null){
        this.obtenerUsuario().subscribe(doc => {
          if(doc != null){
            this.usuario = doc[0];
            if(this.usuario.tipo == "admin"){
              this.menu.changeItemStatus(0, true);
              this.menu.changeItemStatus(1, true);
              this.menu.changeItemStatus(2, true);
              this.menu.changeItemStatus(3, true);
              this.menu.changeItemStatus(4, false);
              this.menu.changeItemStatus(5, true);
              this.menu.changeItemStatus(6, false);
              this.menu.changeItemStatus(7, false);
              this.menu.changeItemStatus(8, true);
            }
            else if(this.usuario.tipo == "cliente"){
              this.menu.changeItemStatus(0, true);
              this.menu.changeItemStatus(1, true);
              this.menu.changeItemStatus(2, true);
              this.menu.changeItemStatus(3, false);
              this.menu.changeItemStatus(4, true);
              this.menu.changeItemStatus(5, true);
              this.menu.changeItemStatus(6, false);
              this.menu.changeItemStatus(7, false);
              this.menu.changeItemStatus(8, true);
            }
            console.log(this.authState);
            console.log(this.usuario);
          }
        });
      }
    });
  }

  obtenerUsuario(email: string = this.getCurrentUser()){
    return this.db.collection("users", ref => ref.where("email", "==", email)).valueChanges();
  }

  login(email: string, password: string){
    return new Promise((resolve, rejected) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.obtenerUsuario(email).subscribe(doc => {
          if(doc != null){
            this.usuario = doc;
            if(this.usuario.tipo == "admin"){
              this.menu.changeItemStatus(0, true);
              this.menu.changeItemStatus(1, true);
              this.menu.changeItemStatus(2, true);
              this.menu.changeItemStatus(3, true);
              this.menu.changeItemStatus(4, false);
              this.menu.changeItemStatus(5, true);
              this.menu.changeItemStatus(6, false);
              this.menu.changeItemStatus(7, false);
              this.menu.changeItemStatus(8, true);
            }
            else if(this.usuario.tipo == "cliente"){
              this.menu.changeItemStatus(0, true);
              this.menu.changeItemStatus(1, true);
              this.menu.changeItemStatus(2, true);
              this.menu.changeItemStatus(3, false);
              this.menu.changeItemStatus(4, true);
              this.menu.changeItemStatus(5, true);
              this.menu.changeItemStatus(6, false);
              this.menu.changeItemStatus(7, false);
              this.menu.changeItemStatus(8, true);
            }
          }
        });
        resolve(user);
      })
      .catch(error => rejected(error));
    });
  }

  register(email: string, password: string, tipo: string){
    return new Promise((resolve, rejected) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        let fecha = Date.now();
        this.db.collection("users").doc(email+"."+fecha).set({
          id: email+"."+fecha,
          email: email,
          password: password,
          tipo: tipo,
          fecha: fecha
        });
        if(tipo == "admin"){
          this.menu.changeItemStatus(0, true);
          this.menu.changeItemStatus(1, true);
          this.menu.changeItemStatus(2, true);
          this.menu.changeItemStatus(3, true);
          this.menu.changeItemStatus(4, false);
          this.menu.changeItemStatus(5, true);
          this.menu.changeItemStatus(6, false);
          this.menu.changeItemStatus(7, false);
          this.menu.changeItemStatus(8, true);
        }
        else if(tipo == "cliente"){
          this.menu.changeItemStatus(0, true);
          this.menu.changeItemStatus(1, true);
          this.menu.changeItemStatus(2, true);
          this.menu.changeItemStatus(3, false);
          this.menu.changeItemStatus(4, true);
          this.menu.changeItemStatus(5, true);
          this.menu.changeItemStatus(6, false);
          this.menu.changeItemStatus(7, false);
          this.menu.changeItemStatus(8, true);
        }
        resolve(user);
      })
      .catch(error => rejected(error));
    });
  }

  logout(){
    let retorno:boolean = false;
    this.auth.signOut()
    .then(() => {
      retorno = true;
      this.menu.changeItemStatus(0, false);
      this.menu.changeItemStatus(1, false);
      this.menu.changeItemStatus(2, false);
      this.menu.changeItemStatus(3, false);
      this.menu.changeItemStatus(4, false);
      this.menu.changeItemStatus(5, false);
      this.menu.changeItemStatus(6, true);
      this.menu.changeItemStatus(7, true);
      this.menu.changeItemStatus(8, false);
    })
    .catch(error => {
      console.log(error);
      retorno = false;
    })
    return retorno;
  }
  
  getCurrentUser(){
    if(this.authState != null){
      return this.authState.email;
    }
  }

  isLoggedIn() {
    return new Promise((resolve, rejected) => {
      this.auth.authState.pipe(first()).toPromise()
      .then(user => {
        let logged = false;
        if (user != null){
          logged = true;
        }
        resolve(logged);
      })
      .catch(error => rejected(error));
    });
  }

  async isLogged(){
    let logged: boolean;
    await this.isLoggedIn()
    .then((res: any) => {
      logged = res;
    })
    .catch((error: any) => {
      logged = false;
      console.log(error);
    });
    return logged;
  }

  registrarMascota(animal: string, raza: string, nombre: string, edad: number, email: string = this.getCurrentUser()){
    let fecha: number = Date.now();
    let idMascota: string = fecha + "." + nombre;
    return this.db.collection("mascotas").doc(idMascota).set({
      animal: animal,
      raza: raza,
      nombre: nombre,
      edad: edad,
      email: email,
      fecha: fecha
    });
  }

  traerTodasLasMascotas(){
    return this.db.collection("mascotas").valueChanges();
  }

  traerMascotasCliente(email: string){
    return this.db.collection("mascotas", ref => ref.where("email", "==", email)).valueChanges();
  }

  traerUnaMascota(id: string){
    return this.db.collection("mascotas").doc(id).get();
  }

  modificarMascota(id: string, animal: string, raza: string, nombre: string, edad: number, email: string){
    return this.db.collection("mascotas").doc(id).update({
      "animal": animal,
      "raza": raza,
      "nombre": nombre,
      "edad": edad,
      "email": email
    });
  }

  pedirTurno(animal: string, nombre: string, turno: string){
    let fecha = Date.now();
    let id = fecha + "." + this.getCurrentUser();
    return this.db.collection("turnos").doc(id).set({
      id: id,
      cliente: this.getCurrentUser(),
      animal: animal,
      nombre: nombre,
      fechaTurno: turno,
      fechaPedido: fecha
    });
  }

  traerTurnos(){
    return this.db.collection("turnos").valueChanges();
  }

  traerUsuariosPorTipo(tipo: string){
    return this.db.collection("users", ref => ref.where("tipo", "==", tipo)).valueChanges();
  }

  public guardarMensaje(mensaje:string){
    let fecha = Date.now();
    let id = fecha + "." + this.getCurrentUser();
    return this.db.collection("mensajes").doc(id).set({
      id: id,
      usuario: this.getCurrentUser(),
      mensaje: mensaje,
      milisegundos: fecha
    });
  }

  public traerMensajes(){
    return this.db.collection("mensajes", ref => ref.orderBy("milisegundos")).valueChanges();
  }
}