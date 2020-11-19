import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-card-email',
  templateUrl: './card-email.component.html',
  styleUrls: ['./card-email.component.scss']
})
export class CardEmailComponent implements OnInit {

  email: string = "";
  mensaje: string = "";

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.authState.subscribe((state: any) => {
      if(state != null){
        this.email = state.email;
        this.mensaje = "Sesión iniciada con el mail: " + this.email;
      }
    });
  }
}
