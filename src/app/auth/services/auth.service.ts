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

  login( email: string, password : string){

    const url = `${this.baseUrl}/auth`;
    const body = {email, password}

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if( resp.ok){
          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid : resp.uid!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err)) 
    )
  }


  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/renew`;
    const headers= new HttpHeaders()
    .set ('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>(url, {headers})
    .pipe(
      map( resp => {
      return resp.ok!
      }),
      catchError( err => of(false))
    )
  }
}
