import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environments } from 'src/environments/environments';
import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string = environments.baseUrl;
  private _user! : User;

  get user () {
    return{...this._user}
  }  

  constructor( private http : HttpClient) { }

  register(name:string, email:string, password:string){
    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password}

    return this.http.post<AuthResponse>(url, body)
    .pipe( //PERSONALIZAR PIPE  
      tap( ({ ok, token}) => {
        if(ok){
          localStorage.setItem('token',token!)
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err)) 
    )
  }


  login( email: string, password : string){

    const url = `${this.baseUrl}/auth`;
    const body = {email, password}

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if( resp.ok){
          localStorage.setItem('token', resp.token!)
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err)) 
    )
  }


  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers= new HttpHeaders()
    .set ('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>(url, {headers})
    .pipe(
      map( resp => {
        console.log(resp.token)
        localStorage.setItem('token', resp.token!)
        this._user = {
          name: resp.name!,
          uid : resp.uid!, 
          email : resp.email!
        }
      return resp.ok!
      }),
      catchError( err => of(false))
    )
  }

  logout(){
    localStorage.clear();
  }
}


