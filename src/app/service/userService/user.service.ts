import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface employee {
  employeeAge: number;
  employeeName: string;
  employeeSalary: string;
  id: number;
  profileImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  public list():Observable<any>{
    return this.http.get<any>(`${this.URI}/employees`);
  }

  save(data): Observable<any> {   
    return this.http.post<any>(`${this.URI}/employees`,data)
  }

  update(data): Observable<any> {
    return this.http.put<employee>(`${this.URI}/employees/${data.id}`,data)
  }

  delete(data):Observable<any>{
    console.log(data)
    return this.http.delete(`${this.URI}/employees/${data.id}`)
  }
}