import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URI: string;
  constructor(private http: HttpClient) { 
    this.URI = `${environment.apiUrl}`
  }

  public list():Observable<any>{
    return this.http.get<any>(`${this.URI}/product/list`);
  }

  public save(data:any):Observable<any>{
    return this.http.post<any>(`${this.URI}/product/save`,data);
  }

  public update(data:any):Observable<any>{
    return this.http.post<any>(`${this.URI}/product/update`,data);
  }
}
