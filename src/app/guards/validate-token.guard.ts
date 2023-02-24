import { Injectable } from '@angular/core';
import {  CanActivate, CanLoad} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
 
  canActivate(): Observable<boolean> | boolean  {
    console.log('canActivate')
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log ('canLoad')
    return true;
  }
}
