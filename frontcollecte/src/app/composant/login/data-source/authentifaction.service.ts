import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface Credentials{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthentifactionService {
  private http = inject(HttpClient);
  private url = "http://localhost:8080/api/auth";

  constructor() { }

  login(credentials:any): Observable<boolean> {
    console.log(credentials)
    return this.http.post<any>(this.url+"/token", credentials)
      .pipe(
        map(response => {
          localStorage.setItem('token', response['token']);
          return true;
        }),
        catchError(error => {
          return of(false);
        })
      );
  }
}
