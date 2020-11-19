import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  hayError: boolean = false;
  exito: boolean = false;
  mensaje: string = "";
  spinner: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registrarAdmin(e: any){
    this.spinner = true;
    this.hayError = false;
    this.exito = false;
    setTimeout(() => {
      this.auth.register(e.email, e.clave, e.tipo)
      .then(() => {
        this.mensaje = "¡Admin dado de alta!";
        this.exito = true;
        this.hayError = false;
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
        else if(error.code == "auth/email-already-in-use"){
          this.mensaje = "Ese correo electrónico ya se encuentra en uso.";
        }
        else if(error.code == "auth/weak-password"){
          this.mensaje = "La contraseña debe tener al menos 6 caracteres.";
        }
        else{
          this.mensaje = error;
        }
        this.exito = false;
        this.hayError = true;
        this.spinner = false;
      });  
    }, 2000);
  }
}
