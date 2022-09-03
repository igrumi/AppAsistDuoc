import { NivelEducacional } from './NivelEducacional';
 
export class Persona {
  public nombre = '';
  public apellido = '';
  public nivelEducacional: NivelEducacional = new NivelEducacional();
  public fechaNacimiento = new Date();
 
  constructor() {
    this.fechaNacimiento = null;
  }
 
  public getTextoIdNivelEducacional(): string {
    if (this.nivelEducacional.id === 0) {
      return 'No asignado';
    }
    return this.nivelEducacional.id.toString();
  }
 
  public getTextoNombreNivelEducacional(): string {
    if (this.nivelEducacional.nombre.trim() === '') {
      return 'No asignado';
    }
    return this.nivelEducacional.nombre;
  }
 
  public getTextoFechaNacimiento(): string {
    if (this.fechaNacimiento === null) {
      return 'No asignado';
    }
    if (this.fechaNacimiento.toString().trim() === '') {
      return 'No asignado';
    }
    const d = this.fechaNacimiento.getDate();
    const m = this.fechaNacimiento.getMonth() + 1;
 
    return (d < 10? '0' + d.toString() : d.toString()) + '/'
      + (m < 10? '0' + m.toString() : m.toString()) + '/'
      + this.fechaNacimiento.getFullYear().toString();
  }
 
  public getTextoNivelEducacional(): string {
    return this.nivelEducacional.getTextoNivelEducacional();
  }
}


