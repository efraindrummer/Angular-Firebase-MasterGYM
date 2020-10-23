import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = []; 
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        console.log(inscripcion.data());
        let inscripcionObtenida = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000);
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds * 1000);
          this.inscripciones.push(inscripcionObtenida);
        })
      })
    })
  }

}
