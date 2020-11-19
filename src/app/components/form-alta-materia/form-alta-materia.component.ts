import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-form-alta-materia',
  templateUrl: './form-alta-materia.component.html',
  styleUrls: ['./form-alta-materia.component.scss']
})
export class FormAltaMateriaComponent implements OnInit {

  @Output() nuevaMateria = new EventEmitter<any>();

  materia = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]],
    clave: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  });
  tipo: string = "admin";

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onChange(change: MatRadioChange){
    this.tipo = change.value;
  }

  emitirNuevoRegistro(){
    let usuario = {
      email: this.usuario.controls["email"].value,
      clave: this.usuario.controls["clave"].value,
      tipo: this.tipo
    };
    this.nuevoRegistro.emit(usuario);
  }
}
