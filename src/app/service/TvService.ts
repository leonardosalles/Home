import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TvService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  list(area: string) {
    return this.http.get<any[]>(`${this.url}/tv/single/${area}`).toPromise();
  }

  sendKey(area: string, ip: string, key: string) {
    return this.http.get<any[]>(`${this.url}/tv/single/${area}/KEY_${key}?ip=${ip}`).toPromise();
  }

  onOff(area: string, ip: string) {
    return this.http.get<any>(`${this.url}/tv/single/${area}/KEY_POWER?ip=${ip}`).toPromise();
  }

  status(area: string, ip: string) {
    return this.http.get<any>(`${this.url}/tv/single/${area}/status/available?ip=${ip}`).toPromise();
  }

  send(area: string, ip: string, text: string) {
    return this.http.get<any>(`${this.url}/tv/single/${area}/text/send?ip=${ip}&text=${text}`).toPromise();
  }
}