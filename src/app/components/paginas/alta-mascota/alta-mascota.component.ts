import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.scss']
})
export class AltaMascotaComponent implements OnInit {

  usuario: any = {};
  animal: string = "Perro";
  mascota = this.fb.group({
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
  mostrarCampoDuenio: boolean = false;

  constructor(private fb: FormBuilder, private db: AuthService) { }

  ngOnInit(): void {
    this.db.obtenerUsuario().subscribe(usuario => {
      this.usuario = usuario[0];
      console.log(this.usuario);
      if(this.usuario.tipo == "admin"){
        this.mostrarCampoDuenio = true;
      }
      else if(this.usuario.tipo == "cliente"){
        this.mascota.controls["email"].setValue(this.usuario.email);
        this.mostrarCampoDuenio = false;
      }
    });
  }

  onChange(change: MatRadioChange){
    this.animal = change.value;
  }

  enviar(){
    let raza: string = this.mascota.controls["raza"].value;
    let nombre: string = this.mascota.controls["nombre"].value;
    let edad: number = this.mascota.controls["edad"].value;
    let email: string = this.mascota.controls["email"].value;
    
    this.db.registrarMascota(this.animal, raza, nombre, edad, email)
    .then(() => {
      this.mascota.controls["raza"].setValue("");
      this.mascota.controls["nombre"].setValue("");
      this.mascota.controls["edad"].setValue("");
      if(this.usuario.tipo == "admin"){
        this.mascota.controls["email"].setValue("");
      }
      this.mensaje = "¡Mascota dada de alta!";
      this.exito = true;
    })
    .catch(error => {
      console.log(error);
      this.mensaje = error;
      this.hayError = true;
    });
  }
}
