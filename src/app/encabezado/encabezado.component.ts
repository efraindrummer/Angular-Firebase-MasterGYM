import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  usuario: User; 
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut();
  }

}
