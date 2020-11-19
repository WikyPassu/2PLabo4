import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.scss']
})
export class ListadoMascotasComponent implements OnInit {

  usuario: any = {};
  lista = new Array();
  esAdmin: boolean = false;
  datosListos: boolean = false;
  spinner: boolean = false;

  constructor(private db: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.spinner = true;
    this.db.obtenerUsuario().subscribe(usuario => {
      this.usuario = usuario[0];
      if(this.usuario.tipo == "admin"){
        this.esAdmin = true;
        this.db.traerTodasLasMascotas().subscribe(lista => {
          this.lista = lista;
          this.datosListos = true;
          this.spinner = false;
        });
      }
      else if(this.usuario.tipo == "cliente"){
        this.esAdmin = false;
        this.db.traerMascotasCliente(this.usuario.email).subscribe(lista => {
          this.lista = lista;
          this.datosListos = true;
          this.spinner = false;
        });
      }
    });
  }

  irModificar(id: string){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.router.navigate(["/modificar-mascota"], {state: {id: id}});  
    }, 2000);
  }
}
