export class NivelEducacional {
  public id: number;
  public nombre: string;
 
  public constructor() {
    this.id = 0;
    this.nombre = '';
  }
 
  public getNivelesEducacionales(): NivelEducacional[] {
    const nivelesEducacionales = [];
    nivelesEducacionales.push({ id: 1, nombre: 'Básica Incompleta'});
    nivelesEducacionales.push({ id: 2, nombre: 'Básica Completa'});
    nivelesEducacionales.push({ id: 3, nombre: 'Media Incompleta'});
    nivelesEducacionales.push({ id: 4, nombre: 'Media Completa'});
    nivelesEducacionales.push({ id: 5, nombre: 'Superior Incompleta'});
    nivelesEducacionales.push({ id: 6, nombre: 'Superior Completa'});
    return nivelesEducacionales;
  }
 
  public setNivelEducacional(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
 
  public findNombreBy(id: number) {
    if (id < 1 || id > 6) {
      return 'Sin nivel educacional';
    }
    return this.getNivelesEducacionales().find(n => n.id === id).nombre;
  }
 
  public getTextoId(): string {
    if (this.id < 1 || this.id > 6) {
      return 'Sin nivel educacional';
    }
    return this.id.toString();
  }
 
  public getTextoNombre(): string {
    return this.nombre? this.nombre : 'No asignado';
  }
 
  public getTextoNivelEducacional(): string {
    if (this.id < 1 || this.id > 6) {
      return 'No asignado';
    } else {
      return this.id.toString() + ' - ' + this.findNombreBy(this.id);
    }
  }
}
