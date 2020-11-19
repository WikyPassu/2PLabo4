import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.scss']
})
export class AltaMateriaComponent implements OnInit {

  hayError: boolean = false;
  exito: boolean = false;
  mensaje: string = "";
  spinner: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registrarMateria(e: any){
    this.spinner = true;
    this.hayError = false;
    this.exito = false;
    setTimeout(() => {
      this.auth.registrarMateria(e.nombre, e.cuatrimestre, e.cupo, e.anio, e.profesor)
      .then(() => {
        this.mensaje = "¡Materia dada de alta!";
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
