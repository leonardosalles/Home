import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lamp } from '../model/lamp.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LampService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  list(area: string) {
    return this.http.get<Lamp[]>(`${this.url}/lamp/single/${area}`).toPromise();
  }

  on(area: string, ip: string) {
    return this.http.get<any>(`${this.url}/lamp/single/${area}/on?ip=${ip}`).toPromise();
  }

  off(area: string, ip: string) {
    return this.http.get<any>(`${this.url}/lamp/single/${area}/off?ip=${ip}`).toPromise();
  }
}