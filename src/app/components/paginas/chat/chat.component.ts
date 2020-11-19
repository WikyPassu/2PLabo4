import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  contactos = new Array();
  mensajes = new Array();
  usuario: any = {};
  mensaje: string = "";
  esAdmin: boolean = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private db: AuthService) { }

  ngOnInit(): void {
    // this.db.obtenerUsuario().subscribe(usuario => {
    //   this.usuario = usuario[0];
    //   if(this.usuario.tipo == "admin"){
    //     this.db.traerUsuariosPorTipo("cliente").subscribe(clientes => {
    //       this.contactos = clientes;
    //     });
    //   }
    //   else if(this.usuario.tipo == "cliente"){
    //     this.db.traerUsuariosPorTipo("admin").subscribe(clientes => {
    //       this.contactos = clientes;
    //     });
    //   }
    // });
    this.db.obtenerUsuario().subscribe(usuario => {
      this.usuario = usuario[0];
      this.db.traerMensajes().subscribe(mensajes => {
        this.mensajes = mensajes;
        this.mensajes.forEach(mensaje => {
          if(mensaje.usuario == this.usuario.email)
          {
            mensaje.mio = true;
          }
          else{
            mensaje.mio = false;
          }
        });
      });
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  async enviarMensaje(){
    if(this.mensaje != ""){
      this.db.guardarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = "";
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}
