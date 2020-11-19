import { Injectable } from '@angular/core';
import { MenuItem } from "../interfaces/menu-item";

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  
  menuItems: MenuItem[] = [
    {
      texto: "Inicio",
      icono: "home",
      ruta: "",
      activo: false
    },
    {
      texto: "Alta administrador",
      icono: "",
      ruta: "alta-admin",
      activo: false
    },
    {
      texto: "Alta materia",
      icono: "",
      ruta: "alta-materia",
      activo: false
    },
    {
      texto: "Inscripción materia",
      icono: "",
      ruta: "inscripcion-materia",
      activo: false
    },
    {
      texto: "Listado materias",
      icono: "",
      ruta: "listado-materias",
      activo: false
    },
    {
      texto: "Listado usuarios",
      icono: "",
      ruta: "chat",
      activo: false
    },
    {
      texto: "Registrarse",
      icono: "person_add",
      ruta: "registro",
      activo: true
    },
    {
      texto: "Iniciar sesión",
      icono: "login",
      ruta: "iniciar-sesion",
      activo: true
    },
    {
      texto: "Cerrar sesión",
      icono: "exit_to_app",
      ruta: "cerrar-sesion",
      activo: false
    }
  ];;
  
  constructor() {}

  changeItemStatus(index: number, activo: boolean){
    this.menuItems[index].activo = activo;
  }
}
