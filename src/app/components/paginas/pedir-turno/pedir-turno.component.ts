import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.scss']
})
export class PedirTurnoComponent implements OnInit {

  animal: string = "Perro";
  mascota = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$")
    ]]
  });
  fecha: string;
  mensaje: string = "";
  hayError: boolean = false;
  exito: boolean = false;

  constructor(private fb: FormBuilder, private db: AuthService) { }

  ngOnInit(): void {
  }

  onChange(change: MatRadioChange){
    this.animal = change.value;
  }

  enviar(){
    let milisegundosActual = Date.now();
    let fechaTurno = new Date(this.fecha);
    let milisegundosTurno = fechaTurno.getTime();
    let nombre: string = this.mascota.controls["nombre"].value;
    if(milisegundosTurno > milisegundosActual){
      this.db.pedirTurno(this.animal, nombre, this.fecha)
      .then(() => {
        this.mensaje = "¡Turno asignado!";
        this.exito = true;
        this.hayError = false;
      })
      .catch(error => {
        this.mensaje = error;
        this.hayError = true;
        this.exito = false;
      });
    }
    else{
      this.mensaje = "No hay turno disponible para esa fecha.";
      this.hayError = true;
      this.exito = false;
    }
  }
}
