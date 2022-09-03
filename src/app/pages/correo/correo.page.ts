import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  public usuario: Usuario;
  constructor(private readonly router: Router, private readonly toastController: ToastController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
    this.usuario.nombrePersona = '';
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if(!this.usuario.nombreUsuario)  {
      this.mostrarMensaje('Debe completar este campo, es obligatorio');
      return;
    }

    const usuarios = this.usuario.getUsuarios();
    let existe = false;
    let user: any;
    for(let u of usuarios) {
      if(u.nombreUsuario === (this.usuario.nombreUsuario).trim()) {
        existe = true;
        user = u;
      }
    }

    if(existe) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: user
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }else {
      this.mostrarMensaje('El usuario no existe...')
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
