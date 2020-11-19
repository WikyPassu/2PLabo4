import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() nuevoLogin = new EventEmitter<any>();

  usuario = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]],
    clave: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  emitirLogin(){
    let usuario: any = {
      email: this.usuario.controls["email"].value,
      clave: this.usuario.controls["clave"].value
    };
    this.nuevoLogin.emit(usuario);
  }

  loginUsuario(opcion: number){
    let usuario: any = {};
    switch(opcion){
      case 1:
        usuario = {
          email: "admin@gmail.com",
          clave: "123123"
        }
        break;
      case 2:
        usuario = {
          email: "alumno@gmail.com",
          clave: "123123"
        }
        break;
      case 3:
        usuario = {
          email: "profesor@gmail.com",
          clave: "123123"
        }
        break;
    }
    this.nuevoLogin.emit(usuario);
  }
}
