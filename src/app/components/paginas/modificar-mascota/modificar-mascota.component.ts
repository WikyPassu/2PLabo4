import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-modificar-mascota',
  templateUrl: './modificar-mascota.component.html',
  styleUrls: ['./modificar-mascota.component.scss']
})
export class ModificarMascotaComponent implements OnInit {

  id: string = "";
  mascota: any = {};
  usuario: any = {};
  animal: string = "Perro";
  mascotaForm = this.fb.group({
    raza: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]],
    nombre: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]],
    edad: ['', [
      Validators.required,
      Validators.min(1),
      Validators.max(20),
      Validators.pattern("^[0-9]*$")
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]]
  });
  mensaje: string = "";
  exito: boolean = false;
  hayError: boolean = false;
  hayMascota: boolean = false;
  mostrarCampoDuenio: boolean = false;
  spinner: boolean = false;

  constructor(private router: Router, private db: AuthService, private fb: FormBuilder) {
    let navigation = this.router.getCurrentNavigation().extras.state;
    if(navigation != undefined){
      this.id = navigation.id;
      this.hayMascota = true;
    }
  }

  ngOnInit(): void {
    if(this.id != ""){
      this.db.traerUnaMascota(this.id).subscribe(mascota => {
        this.mascota = mascota.data();
        this.animal = this.mascota.animal;
        this.mascotaForm.controls["raza"].setValue(this.mascota.raza);
        this.mascotaForm.controls["nombre"].setValue(this.mascota.nombre);
        this.mascotaForm.controls["edad"].setValue(this.mascota.edad);
        this.mascotaForm.controls["email"].setValue(this.mascota.email);
      });
      this.db.obtenerUsuario().subscribe(usuario => {
        this.usuario = usuario[0];
        console.log(this.usuario);
        if(this.usuario.tipo == "admin"){
          this.mostrarCampoDuenio = true;
        }
        else if(this.usuario.tipo == "cliente"){
          this.mascotaForm.controls["email"].setValue(this.usuario.email);
          this.mostrarCampoDuenio = false;
        }
      });
    }
  }

  onChange(change: MatRadioChange){
    this.animal = change.value;
  }

  modificar(){
    let raza: string = this.mascotaForm.controls["raza"].value;
    let nombre: string = this.mascotaForm.controls["nombre"].value;
    let edad: number = this.mascotaForm.controls["edad"].value;
    let email: string = this.mascotaForm.controls["email"].value;
    this.spinner = true;
    setTimeout(() => {
      this.db.modificarMascota(this.mascota.id, this.animal, raza, nombre, edad, email)
      .then(() => {
        this.mensaje = "¡Mascota modificada!";
        this.exito = true;
        this.spinner = false;
      })
      .catch(error => {
        this.mensaje = error;
        this.hayError = true;
        this.spinner = false;
      });  
    }, 2000);
  }
}
