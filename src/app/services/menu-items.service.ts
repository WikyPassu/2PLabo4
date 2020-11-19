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
      texto: "Alta mascota",
      icono: "pets",
      ruta: "alta-mascota",
      activo: false
    },
    {
      texto: "Listado mascotas",
      icono: "view_list",
      ruta: "listado-mascotas",
      activo: false
    },
    {
      texto: "Listado turnos",
      icono: "assignment",
      ruta: "listado-turnos",
      activo: false
    },
    {
      texto: "Pedir turno",
      icono: "assignment_turned_in",
      ruta: "pedir-turno",
      activo: false
    },
    {
      texto: "Chat",
      icono: "chat",
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
