import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { NivelEducacional } from '../../model/NivelEducacional';
import { Persona } from '../../model/Persona';
import { Animation, AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef, static: true}) itemNombre: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef, static: true}) itemApellido: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef, static: true}) itemEducacion: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef, static: true}) itemFechaNacimiento: ElementRef;

  public usuario: Usuario;

  public nivelesEducacionales: NivelEducacional[] = new NivelEducacional().getNivelesEducacionales();

  public persona: Persona = new Persona();

  /*
    En el constructor del HomePage se ponen como parametros los siguientes objetos:
      (1) activeroute (del tipo de dato ActivatedRoute) y router (del tipo de dato Router),
      que se usarán para obtener los datos enviados por la página que invocó a "home".
      (2) alertController (del tipo de dato AlertController), que se usará para mostrar
      mensajes emergentes en la pantalla.

    Nótese que los parámetros tuvieron que declararse con "private", y esto es necesario
    para que los parámetros pasen a considerarse automáticamente como propiedades
    de la clase "HomePage" y de este modo puedan usarse dentro de los otros métodos.
   */
constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController) {

    // Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
    this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
      this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    });
}

public ngOnInit(): void {
  // this.persona.nombre = 'Cristián';
  // this.persona.apellido = 'Gómez';
  // this.persona.nivelEducacional.id = 6;
  // this.persona.fechaNacimiento = '1972-12-26';
}

public ngAfterViewInit(): void {
  const animation = this.animationController
    .create()
    .addElement(this.titulo.nativeElement)
    .iterations(Infinity)
    .duration(6000)
    .fromTo('transform', 'translate(0%)', 'translate(100%)')
    .fromTo('opacity', 0.2, 1);

  animation.play();
}



public limpiarFormulario(): void {
  /*
    El método limpiar recorre cada uno de los campos de la propiedad persona,
    de modo que la variable "key" va tomando el nombre de dichos campos (nombre,
    apellido, etc.) y "value" adopta el valor que tiene en ese momento el
    campo asociado a key.
  */
  for (const [key, value] of Object.entries(this.persona)) {
    /*
      Con la siguiente instrucción se cambia el valor de cada campo
      de la propiedad persona, y como los controles gráficos están
      asociados a dichos nombres de campos a través de ngModel, entonces
      al limpiar el valor del campo, también se limpia el control gráfico.
    */
      Object.defineProperty(this.persona, key, {value: ''});
    }

    this.animateItem(this.itemNombre.nativeElement);
    this.animateItem(this.itemApellido.nativeElement);
    this.animateItem(this.itemEducacion.nativeElement);
    this.animateItem(this.itemFechaNacimiento.nativeElement);
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  public mostrarDatosPersona(): void {
    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = '<br>Usuario: ' + this.usuario.nombreUsuario;
    mensaje += '<br>Nombre: ' + this.persona.nombre;
    mensaje += '<br>Apellido: ' + this.persona.apellido;
    mensaje += '<br>Educación: ' + this.persona.getTextoNivelEducacional();
    mensaje += '<br>Nacimiento: ' + this.persona.getTextoFechaNacimiento();

    this.presentAlert('Datos personales', mensaje);
  }

  // Este método sirve para mostrar el mensaje emergente
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}