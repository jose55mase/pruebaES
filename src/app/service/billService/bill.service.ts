import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  public list():Observable<any>{
    return this.http.get<any>(`${this.URI}/bill/list`);
  }

  public save(data:any):Observable<any>{
    return this.http.post<any>(`${this.URI}/bill/save`,data);
  }

}
