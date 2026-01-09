import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NocService {

  private http = inject(HttpClient);

  private URL = 'http://13.200.126.121:3000/api/v1/noc';

  getNocApplications() {
    return this.http.get<any[]>(`${this.URL}`);
  }
}
