import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-alta-admin',
  templateUrl: './form-alta-admin.component.html',
  styleUrls: ['./form-alta-admin.component.scss']
})
export class FormAltaAdminComponent implements OnInit {

  @Output() nuevaAltaAdmin = new EventEmitter<any>();

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

  emitirAltaAdmin(){
    let usuario = {
      email: this.usuario.controls["email"].value,
      clave: this.usuario.controls["clave"].value,
      tipo: "admin"
    };
    this.nuevaAltaAdmin.emit(usuario);
  }
}
