import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  urlServer = 'http://51.79.26.171';
  //urlServer = 'http://localhost:3000';
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};
  constructor(
    private http: HttpClient
  ) { }


  getUser(id: any){
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/current_user/${id}`, this.httpHeaders ).subscribe(
        (data: any)=>{
          accept(data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject("Error Por favor intente mas tarde");
          }else{
            reject("Error al obtener el usuario");
          }
        }
      );
    });
  }

  updateUser(user:any){
    const user_params = {
      user: user
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders ).subscribe(
        (data: any)=>{
          accept(data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500) {
            reject("Error Por favor intente mas tarde");
          }else{
            reject("Error al actualizar el usuario");
          }
        }
      )  
  });
}
lisUsers(page: number, perPage: number, query: string = ''){
  const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
  return this.http.get(url).toPromise();
}

}
