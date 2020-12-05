import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {


  baseUrl:string="https://reqres.in/api/"
  constructor(private http: HttpClient) { }

  getEmpList(): Observable<any>{
    return this.http.get(this.baseUrl + 'users?page=1', {responseType: 'json'});
  }

 getSingleUser(id): Observable<any> {
  return this.http.get(this.baseUrl + 'users/' + id, {responseType: 'json'});
}

createEmp(payload: any): Observable<any> {
  return this.http.post(this.baseUrl + 'users', payload, httpOptions);
}

}
