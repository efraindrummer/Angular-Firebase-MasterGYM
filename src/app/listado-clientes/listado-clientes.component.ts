import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    /* this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes = resultado;
      console.log(resultado)
    }) */

    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((resultado)=>{
      console.log(resultado.docs);

      resultado.docs.forEach((item)=>{
        //todo esto se puede validar con los console.log 
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;

        this.clientes.push(cliente);
      })
    })
  }

}
