import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  mensaje: string = "";
  hayError: boolean = false;
  spinner: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(e: any){
    this.spinner = true;
    this.hayError = false;
    setTimeout(() => {
      this.auth.login(e.email, e.clave)
      .then(() => {
        this.router.navigate([""]);
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
