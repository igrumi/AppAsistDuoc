export class Usuario {
  public nombreUsuario = '';
  public password = '';
  public nombrePersona ='';

 public validarNombreUsuario(): string {
    if (this.nombreUsuario.trim() === '') {
      return 'Para ingresar al sistema debe ingresar un nombre de usuario.';
    }
    /*if (this.nombreUsuario.length < 3 || this.nombreUsuario.length > 8) {
      return 'El nombre de usuario debe tener entre 3 y 8 caracteres.';
    }
    return '';*/
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    /* 
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
*/
  }
  public validarUsuario(): string {
    return this.validarNombreUsuario()
      || this.validarPassword();
  }
  public getUsuarios(): Usuario[] {
    const usuarios = [];
    usuarios.push({ nombreUsuario: 'atorres@duocuc.cl', password: '1234', nombrePersona: 'Ana Torres Leiva', pregunta: 'Nombre de tu mascota', respuesta: 'gato'});
    usuarios.push({ nombreUsuario: 'avalenzuela@duocuc.cl', password: 'qwer', nombrePersona: 'Alberto Valenzuela Nuñez', pregunta: 'Nombre de tu mejor amigo', respuesta: 'juanito'});
    usuarios.push({ nombreUsuario: 'cfuentes@duocuc.cl', password: 'asdf', nombrePersona: 'Carla Fuentes Gonzáles', pregunta: 'Lugar de nacimiento de tu madre', respuesta: 'Valparaíso'});
    return usuarios;  
  }

  public validarCuentaUsuario(nombreUsuario: String, password: String,): boolean{
    let respuesta: boolean = false;

    this.getUsuarios().forEach(u => {
      if (nombreUsuario=== u.nombreUsuario && password === u.password){
        respuesta = true;
      }
    });
    return respuesta;
  }

  public findNombreBy(password: String) {
    return this.getUsuarios().find(n => n.password === password).nombrePersona;
    }
}