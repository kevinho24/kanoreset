import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  login(credentials: any){
    console.log(credentials, "desde el servicio");
    return new Promise((accept, reject) => {
      if (
        credentials.email === 'kano@gmail.com'
      ){
        accept('login correcto');
      }else{
        reject('login incorrecto')
      }
    });
  }
}