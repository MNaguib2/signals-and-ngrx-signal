// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, interval, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // Replace with your actual API endpoint
    // return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
    return this.http.post<any>('https://fakestoreapi.com/auth/login', {
      username: "mor_2314",
      password: "83r5^sdfsdf_"
    })
    .pipe(map((data) => {
    return {status: true, message: [data]}
    }),
      catchError((error) => {
      // console.log(error);
      return of({status: false, message: [error['error']]});
    })
    );
  }
  getInterval(){
    return interval(1000);
  }
}
