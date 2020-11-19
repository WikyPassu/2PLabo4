import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

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
  mensaje: string = "";
  hayError: boolean = false;
  spinner: boolean = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loginAdmin(){
    this.mensaje = "";
    this.hayError = false;
    this.credenciales.controls['email'].setValue("admin@admin.com");
    this.credenciales.controls['clave'].setValue("123123");
    this.spinner = true;
    setTimeout(() => {
      this.auth.login(this.credenciales.controls['email'].value, this.credenciales.controls['clave'].value)
        .then((res: any) => {
          this.router.navigate([""]);
          this.spinner = false;
        });
    }, 2000);
  }

  loginCliente(){
    this.mensaje = "";
    this.hayError = false;
    this.credenciales.controls['email'].setValue("cliente@cliente.com");
    this.credenciales.controls['clave'].setValue("123123");
    this.spinner = true;
    setTimeout(() => {
      this.auth.login(this.credenciales.controls['email'].value, this.credenciales.controls['clave'].value)
        .then((res: any) => {
          this.router.navigate([""]);
          this.spinner = false;
        });
    }, 2000);
  }

  login(){
    this.mensaje = "";
    this.hayError = false;
    let email: string = this.credenciales.controls['email'].value;
    let password: string = this.credenciales.controls['clave'].value;
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
        this.auth.login(email, password)
        .then((res: any) => {
          this.router.navigate([""]);
          this.spinner = false;
        })
        .catch(error => {
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
