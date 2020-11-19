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
    cupo: ['', [
      Validators.required,
      Validators.min(1),
      Validators.pattern("^[0-9]*$")
    ]],
    anio: ['', [
      Validators.required,
      Validators.min(2021),
      Validators.pattern("^[0-9]*$")
    ]],
    profesor: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]],
  });
  cuatrimestre: string = "Primero";

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onChange(change: MatRadioChange){
    this.cuatrimestre = change.value;
  }

  emitirNuevaMateria(){
    let materia = {
      nombre: this.materia.controls["nombre"].value,
      cupo: this.materia.controls["cupo"].value,
      cuatrimestre: this.cuatrimestre,
      anio: this.materia.controls["anio"].value,
      profesor: this.materia.controls["profesor"].value,
    };
    this.nuevaMateria.emit(materia);
  }
}
