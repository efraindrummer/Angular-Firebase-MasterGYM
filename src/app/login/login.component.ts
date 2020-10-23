import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string =''
  constructor(private creadorFormulario: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  ingresar(){
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
      }).catch((error)=>{
        this.datosCorrectos = false;
        this.textoError = error.message;
        this.spinner.hide();
      })

    }else{
      this.datosCorrectos = false;
      this.textoError = 'Por favor revise que los datos esten correctos';
    }
  }

}
