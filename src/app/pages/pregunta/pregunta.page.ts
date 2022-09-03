import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  nombre: string;
  pregunta: string;
  respuesta: string;
  usuario: Usuario;

  constructor(private readonly activeroute: ActivatedRoute, 
    private readonly router: Router,
    private readonly toastController: ToastController) {
      this.usuario = new Usuario();
      this.usuario.nombreUsuario = '';
      this.usuario.password = '';
      this.usuario.nombrePersona = '';
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(() => {     
      const dataUsuario = this.router.getCurrentNavigation().extras.state.usuario;
      console.log(dataUsuario);
      this.nombre = dataUsuario.nombrePersona;
      this.pregunta = dataUsuario.pregunta;
      this.respuesta = dataUsuario.respuesta;
      this.usuario.password = dataUsuario.password;
    });
  }

  onSubmit() {
    console.log(this.usuario.nombreUsuario);
    if(!this.usuario.nombreUsuario) {
      this.mostrarMensaje('Debes ingresar una respuesta');
    }else {
      if((this.usuario.nombreUsuario).trim() === this.respuesta) {
        const navigationExtras: NavigationExtras = {
          state: {
            clave: this.usuario.password
          }
        };
        this.router.navigate(['/correcto'], navigationExtras)
      }else {
        this.router.navigate(['/incorrecto']);
      }
    }
  }


  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}
