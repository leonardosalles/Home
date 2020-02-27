import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lamp } from '../model/lamp.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LedStripeService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  list(area: string) {
    return this.http.get<Lamp[]>(`${this.url}/led-stripe/single/${area}`).toPromise();
  }

  on(area: string, id: string) {
    return this.http.get<any>(`${this.url}/led-stripe/single/${id}/${area}/on`).toPromise();
  }

  colorByHex(area: string, id: string, colorHex: string) {
    const colorParsed = encodeURIComponent(colorHex);
    return this.http.get<any>(`${this.url}/led-stripe/single/${id}/${area}/color?hex=${colorParsed}`).toPromise();
  }

  colorByRgb(area: string, id: string, r: number, g: number, b: number) {
    return this.http.get<any>(`${this.url}/led-stripe/single/${id}/${area}/color?r=${r}&g=${g}&b=${b}`).toPromise();
  }

  off(area: string, id: string) {
    return this.http.get<any>(`${this.url}/led-stripe/single/${id}/${area}/off`).toPromise();
  }

  intensity(area: string, id: string, intensity: number) {
    return this.http.get<any>(`${this.url}/led-stripe/single/${id}/${area}/intensity?value=${intensity}`).toPromise();
  }
}