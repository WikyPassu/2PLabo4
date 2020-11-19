import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  credenciales = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]],
    clave: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });
  tipo: string = "cliente";
  hayError: boolean = false;
  mensaje: string;
  seRegistro: boolean = false;
  mensajeRegistro: string = "¡Usuario registrado exitosamente!";
  spinner: boolean = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onChange(change: MatRadioChange){
    this.tipo = change.value;
  }

  register(){
    let email: string = this.credenciales.controls['email'].value;
    let password: string = this.credenciales.controls['clave'].value;
    this.mensaje = "";
    this.hayError = false;
    this.seRegistro = false;
    if(email == "" && password == "")
    {
      this.mensaje = "Campos email y contraseña vacíos.";
    }
    else if(email == "")
    {
      this.mensaje = "Campo email vacío.";
    }
    else if(password == "")
    {
      this.mensaje = "Campo contraseña vacío.";
    }
  
    if(this.mensaje != "")
    {
      this.hayError = true;
    }
    else{
      this.spinner = true;
      setTimeout(() => {
        this.auth.register(email, password, this.tipo)
        .then(() => {
          this.seRegistro = true;
          this.spinner = false;
          this.router.navigate([""]);
        })
        .catch(error => {
          console.log(error);
          if(error.code == "auth/invalid-email")
          {
            this.mensaje = "Formato inválido de correo electrónico.";
          }
          else if(error.code == "auth/user-not-found")
          {
            this.mensaje = "No existe un usuario con dicho correo electrónico.";
          }
          else if(error.code == "auth/wrong-password")
          {
            this.mensaje = "Contraseña incorrecta.";
          }
          else if(error.code == "auth/email-already-in-use"){
            this.mensaje = "Ese correo electrónico ya se encuentra en uso.";
          }
          else if(error.code == "auth/weak-password"){
            this.mensaje = "La contraseña debe tener al menos 6 caracteres.";
          }
          else{
            this.mensaje = error;
          }
          this.hayError = true;
          this.spinner = false;
        });  
      }, 2000);
    }
  }
}
