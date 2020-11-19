import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})
export class ListadoTurnosComponent implements OnInit {

  lista = new Array();
  datosListos: boolean = false;
  spinner: boolean = false;

  constructor(private db: AuthService) { }

  ngOnInit(): void {
    this.spinner = true;
    this.db.traerTurnos().subscribe(lista => {
      this.lista = lista;
      this.datosListos = true;
      this.spinner = false;
    });
  }

}
