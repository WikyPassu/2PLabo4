import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  
  hayError: boolean = false;
  exito: boolean = false;
  mensaje: string = "";
  spinner: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(e: any){
    this.spinner = true;
    setTimeout(() => {
      this.auth.register(e.email, e.clave, e.tipo)
      .then(() => {
        this.mensaje = "¡Registro exitoso!";
        this.exito = true;
        this.hayError = false;
        this.spinner = false;
      })
      .catch(error => {
        this.mensaje = error;
        this.exito = false;
        this.hayError = true;
        this.spinner = false;
      });  
    }, 2000);
  }
}
