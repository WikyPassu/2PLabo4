import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss']
})
export class FormRegistroComponent implements OnInit {

  @Output() nuevoRegistro = new EventEmitter<any>();

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
  tipo: string = "alumno";

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
