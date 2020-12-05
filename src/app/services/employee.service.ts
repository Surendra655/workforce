import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  getEmpList(): Observable<any> {
    return this.http.get(this.baseUrl + 'users?page=1', { responseType: 'json' });
  }

  getSingleUser(id): Observable<any> {
    return this.http.get(this.baseUrl + 'users/' + id, { responseType: 'json' });
  }

}
